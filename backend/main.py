from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
app=FastAPI()
#Decorator path operation


## create a Request we use Pydantic BaseModel
if __name__=="__main__":
    uvicorn.run(app,host="127.0.0.1",port=9000)