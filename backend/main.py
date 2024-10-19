from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn

app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    content_type = file.content_type
    
    # Check if the uploaded file is a supported type
    if content_type in ["application/pdf", "image/jpeg", "image/png", "audio/mpeg", "video/mp4"]:
        # Perform file processing based on file type
        file_content = await file.read()  

        if content_type == "application/pdf":
            return {"filename": file.filename, "type": "PDF file received"}
        elif content_type in ["image/jpeg", "image/png"]:
            return {"filename": file.filename, "type": "Image file received"}
        elif content_type == "audio/mpeg":
            return {"filename": file.filename, "type": "Audio file received"}
        elif content_type == "video/mp4":
            return {"filename": file.filename, "type": "Video file received"}
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    return {"filename": file.filename, "type": "Unknown file type"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9000)
