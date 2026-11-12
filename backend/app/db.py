"""DynamoDB single table (PK/SK + GSI1 + GSI2). Locally it runs on moto's in-memory emulator."""
import os
from decimal import Decimal

LOCAL = os.environ.get("ENV", "local") != "prod"
TABLE = os.environ.get("TABLE", "mysureguy")

if LOCAL:
    # Fake credentials first, so nothing here can ever reach a real AWS account.
    os.environ.update(AWS_ACCESS_KEY_ID="local", AWS_SECRET_ACCESS_KEY="local",
                      AWS_DEFAULT_REGION="us-east-1")
    os.environ.pop("AWS_PROFILE", None)
    from moto import mock_aws
    mock_aws().start()

import boto3  # noqa: E402
from boto3.dynamodb.conditions import Key  # noqa: E402

_ddb = boto3.resource("dynamodb", region_name="us-east-1")
table = _ddb.Table(TABLE)


def create_table():
    s = lambda n: {"AttributeName": n, "AttributeType": "S"}  # noqa: E731
    keys = lambda p: [{"AttributeName": p + "PK", "KeyType": "HASH"},  # noqa: E731
                      {"AttributeName": p + "SK", "KeyType": "RANGE"}]
    _ddb.create_table(
        TableName=TABLE, BillingMode="PAY_PER_REQUEST", KeySchema=keys(""),
        AttributeDefinitions=[s(n) for n in ("PK", "SK", "GSI1PK", "GSI1SK", "GSI2PK", "GSI2SK")],
        GlobalSecondaryIndexes=[{"IndexName": g, "KeySchema": keys(g), "Projection": {"ProjectionType": "ALL"}}
                                for g in ("GSI1", "GSI2")],
    )


def reset_local():
    assert LOCAL, "reset is for the local emulator only"
    table.delete()
    create_table()


def _clean(v):
    if isinstance(v, Decimal):
        return int(v)
    if isinstance(v, dict):
        return {k: _clean(x) for k, x in v.items()}
    if isinstance(v, (list, set)):
        return [_clean(x) for x in v]
    return v


def put(item: dict, **kw):
    table.put_item(Item=item, **kw)


def get(pk: str, sk: str) -> dict | None:
    item = table.get_item(Key={"PK": pk, "SK": sk}).get("Item")
    return _clean(item) if item else None


def query(pk: str, prefix: str | None = None, index: str | None = None, newest_first=False) -> list[dict]:
    p = index or ""
    cond = Key(p + "PK").eq(pk)
    if prefix:
        cond &= Key(p + "SK").begins_with(prefix)
    kw = {"KeyConditionExpression": cond, "ScanIndexForward": not newest_first}
    if index:
        kw["IndexName"] = index
    items = []
    while True:
        page = table.query(**kw)
        items += page["Items"]
        if "LastEvaluatedKey" not in page:
            return _clean(items)
        kw["ExclusiveStartKey"] = page["LastEvaluatedKey"]


def update(pk: str, sk: str, expr: str, values: dict, names: dict | None = None, condition: str | None = None) -> dict:
    kw = {"Key": {"PK": pk, "SK": sk}, "UpdateExpression": expr,
          "ExpressionAttributeValues": values, "ReturnValues": "ALL_NEW"}
    if names:
        kw["ExpressionAttributeNames"] = names
    if condition:
        kw["ConditionExpression"] = condition
    return _clean(table.update_item(**kw)["Attributes"])
