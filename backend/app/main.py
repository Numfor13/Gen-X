from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from . import db, routes, seed, ussd
from .service import Fail

app = FastAPI(title="MySureGuy API")

if db.LOCAL:
    app.add_middleware(CORSMiddleware, allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
                       allow_methods=["*"], allow_headers=["*"])
    db.create_table()
    seed.run()


@app.exception_handler(Fail)
def on_fail(_: Request, e: Fail):
    return JSONResponse({"detail": e.msg}, status_code=e.status)


app.include_router(routes.router)
app.include_router(ussd.router)
