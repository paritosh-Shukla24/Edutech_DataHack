from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn
from PIL import Image,PngImagePlugin
import google.generativeai as genai
import json
app = FastAPI()
import os
from dotenv import load_dotenv
from pydub import AudioSegment
from deepGram import Transcriber
from langchain_community.tools import YouTubeSearchTool
from io import BytesIO
import pyttsx3

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)
model_vision = genai.GenerativeModel('gemini-1.5-flash-latest')
model_text=genai.GenerativeModel('gemini-1.5-pro')
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)  
engine.setProperty('rate', 150)  
engine.setProperty('volume', 0.9)  
tool=YouTubeSearchTool()

def Answering(question,answer,options,format):
    if format=='text':
        input_prompt=f"""Yoy are Question Solver which solve the Question and find the appropriate solution.
        Question : {question}
        Options : {options}
        Give detailed solution in 50 words max
        """
        response=model_text.generate_content(input_prompt)
        return response.text
    if format=="audio":
        input_prompt=f"""Yoy are Question Solver which solve the Question and find the appropriate solution and explain solution.
        Question : {question}
        Options : {options}
        Give detailed solution in 100 words max
        """
        response=model_text.generate_content(input_prompt)
        engine.save_to_file(response.text, "output.wav")
        engine.runAndWait()
    if format=="video":
        link=tool.run(answer)
        return link


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    content_type = file.content_type
    
    if content_type in ["application/pdf", "image/jpeg", "image/png", "audio/mpeg", "video/mp4"]:
        file_content = await file.read()  
        if content_type == "application/pdf":
            return {"filename": file.filename, "type": "PDF file received"}
        elif content_type in ["image/jpeg", "image/png"]:
            image = Image.open(BytesIO(file_content))
            difficulty='easy'
            previous="What is the direction of the force acting on the second object, m2, in relation to the direction of the force acting on the first object, m1"
            input_prompt=f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the content of the image provided. 
            Difficulty of Question is : {difficulty}
            Please look at previous Question make sure you don't continue the Question.
            previous Question : {previous}
            """
            prompt="""
            generate 1 Questions and return in json format exactly 1 questions with 4 options and and also correct answer and small solution,with json attributes named question,options,answer,solution.
            """
            response = model_vision.generate_content([input_prompt,image, prompt])
            clean_response = response.text.strip().replace("```json", "").replace("```", "")
            quiz_data = json.loads(clean_response)
            #print(quiz_data)
            return {
                "question":quiz_data['question'],
                "options":quiz_data['options'],
                "answer":quiz_data['answer'],
                "solution": quiz_data['solution']
            }
        elif content_type == "audio/mpeg":
                audio = AudioSegment.from_file(BytesIO(file_content), format="mp3")
                wav_filename = f"{file.filename.split('.')[0]}.wav"
                audio.export(wav_filename, format="wav")
                text=Transcriber(wav_filename)
                difficulty='easy'
                previous='Which of the following is NOT a common type of neural network used in deep learning?'
                input_prompt=f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the User domain which he is aking. Based on Topic  Generate.
            Topic : {text} 
            Difficulty of Question is : {difficulty}
           
            Previous Question : {previous}
             Please look at previous Question make sure you don't repeat and try new type of questions.Completely different Question.

            generate 1 Questions and return in json format exactly 1 questions with 4 options and and also correct answer and small solution,with json attributes named question,options,answer,solution.
            """
                response = model_vision.generate_content(input_prompt)
                clean_response = response.text.strip().replace("```json", "").replace("```", "")
                quiz_data = json.loads(clean_response)
                format='audio'
                link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
                print(link)
                return {
                "question":quiz_data['question'],
                "options":quiz_data['options'],
                "answer":quiz_data['answer'],
                "link": link
                }
        elif content_type == "video/mp4":
            return {"filename": file.filename, "type": "Video file received"}
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    return {"filename": file.filename, "type": "Unknown file type"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9000)
