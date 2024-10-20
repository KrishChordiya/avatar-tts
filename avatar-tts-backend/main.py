from typing import Union

from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse, FileResponse
from utils import text_to_wav
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/convertText")
async def convert_text(request:Request):
    req=await request.json()
    text = req['text']
    text_to_wav(text, "output")
    return FileResponse(path='./output.wav', filename='output', media_type='audio/wav')

@app.get('/getTime')
def give_time():
    with open("output.json") as json_file:
        json_data = json.load(json_file)
    
    return json_data