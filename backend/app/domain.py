"""Pure trust and matching maths. No I/O."""
from math import asin, cos, radians, sin, sqrt

TIER_JOBS_VERIFIED = 3
TIER_JOBS_PRO = 10
TIER_PCT_PRO = 0.8
REVEAL_AFTER_S = 72 * 3600
MIN_RATED_FOR_PCT = 5  # below this a percentage misleads: 1 thumbs-up out of 1 would read as 38%


def wilson_lb(up: int, down: int, z: float = 1.28) -> float | None:
    """Conservative share satisfied: lower bound of the Wilson interval (z=1.28, about the 10th percentile).
    Keeps thin records from looking stronger than they are. None when nobody has rated yet."""
    n = up + down
    if n == 0:
        return None
    p = up / n
    return (p + z * z / (2 * n) - z * sqrt((p * (1 - p) + z * z / (4 * n)) / n)) / (1 + z * z / n)


def km(a: tuple[float, float], b: tuple[float, float]) -> float:
    """Haversine distance in km."""
    lat1, lng1, lat2, lng2 = map(radians, (*a, *b))
    h = sin((lat2 - lat1) / 2) ** 2 + cos(lat1) * cos(lat2) * sin((lng2 - lng1) / 2) ** 2
    return 2 * 6371 * asin(sqrt(h))


def tier(vouches: int, circles: int, verified_jobs: int, pct: float | None) -> int:
    """0 New, 1 Vouched, 2 Verified, 3 Trusted Pro. Each tier needs the one below it."""
    if vouches < 2 or circles < 2:
        return 0
    if verified_jobs < TIER_JOBS_VERIFIED:
        return 1
    if verified_jobs < TIER_JOBS_PRO or (pct or 0) < TIER_PCT_PRO:
        return 2
    return 3


def next_step(vouches: int, circles: int, verified_jobs: int, pct: float | None) -> dict | None:
    """What the artisan still needs for the next tier, as {kind, n}. None at the top."""
    t = tier(vouches, circles, verified_jobs, pct)
    if t == 0:
        return {"kind": "vouches", "n": max(2 - vouches, 1)} if vouches < 2 else {"kind": "circle", "n": 1}
    if t == 1:
        return {"kind": "jobs", "n": TIER_JOBS_VERIFIED - verified_jobs}
    if t == 2:
        if verified_jobs < TIER_JOBS_PRO:
            return {"kind": "jobs", "n": TIER_JOBS_PRO - verified_jobs}
        return {"kind": "score", "n": round(TIER_PCT_PRO * 100)}
    return None


def match_score(dist_km: float, pct: float | None, tier_: int) -> float:
    """Distance, conservative satisfaction and tier. Unrated artisans get a neutral 0.5."""
    return 0.40 * max(0.0, 1 - dist_km / 8) + 0.35 * (0.5 if pct is None else pct) + 0.25 * tier_ / 3


def revealed(job: dict, now: int) -> bool:
    """Reviews show once both sides have rated, or 72 hours after completion."""
    r = job.get("reviews", {})
    if "customer" in r and "artisan" in r:
        return True
    done = job.get("completed_at")
    return bool(done) and now >= done + REVEAL_AFTER_S
