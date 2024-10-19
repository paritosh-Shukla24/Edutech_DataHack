from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn
from PIL import Image,PngImagePlugin
import google.generativeai as genai
import json
import ast
import os
from dotenv import load_dotenv
from pydub import AudioSegment
from deepGram import Transcriber
from langchain_community.tools import YouTubeSearchTool
from io import BytesIO
import pyttsx3
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr

from dotenv import load_dotenv
import os
from pydantic import BaseModel
from Ai import QuizRLAgent
app = FastAPI()
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
quiz=QuizRLAgent(initial_score=50)
genai.configure(api_key=api_key)
model_vision = genai.GenerativeModel('gemini-1.5-flash-latest')
model_text=genai.GenerativeModel('gemini-1.5-pro')
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)  
engine.setProperty('rate', 150)  
engine.setProperty('volume', 0.9)  
tool=YouTubeSearchTool()
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from bson import ObjectId
from pymongo import MongoClient
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import pytesseract
from PyPDF2 import PdfReader
from docx import Document
from pptx import Presentation

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
# MongoDB setup
client = MongoClient('mongodb+srv://Hackathon:59ILYisG4iNaGNRU@cluster0.w6oegog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.get_database('Hackathon')  # Replace with your DB name
users_collection = db.get_collection('users')

# FastAPI app
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Pydantic models
class Token(BaseModel):
    access_token: str
    token_type: str

quiz = QuizRLAgent(initial_score = 70)
class TokenData(BaseModel):
    email: str

class User(BaseModel):
    email: str
    password: str

# JWT utility functions
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# API endpoints
@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"email": form_data.username})
    
    if not user or not verify_password(form_data.password, user['password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"email": user['email']})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/register")
async def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    users_collection.insert_one({"email": user.email, "password": hashed_password})
    return {"message": "User registered successfully"}

@app.get("/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        if email is None:
            raise credentials_exception
        return {"email": email}
    except JWTError:
        raise credentials_exception




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
    
def extract_text_from_pdf(file_content):
    reader = PdfReader(BytesIO(file_content))
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def extract_text_from_docx(file_content):
    doc = Document(BytesIO(file_content))
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def extract_text_from_pptx(file_content):
    presentation = Presentation(BytesIO(file_content))
    text = ""
    for slide in presentation.slides:
        for shape in slide.shapes:
            if hasattr(shape, "text"):
                text += shape.text + "\n"
    return text

def extract_text_from_image(image_content):
    # Use pytesseract to extract text from an image
    image = Image.open(BytesIO(image_content))
    text = pytesseract.image_to_string(image)
    return text


global_image = None  
global_text_audio=None

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    content_type = file.content_type
    global global_image  
    print(content_type)
    
    if content_type in ["application/pdf", "image/jpeg", "image/png", "audio/mpeg", "video/mp4", 
                   "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
                   "application/vnd.openxmlformats-officedocument.presentationml.presentation"]:
        file_content = await file.read()  
        if content_type == "application/pdf":
            text = extract_text_from_pdf(file_content)
            txt_file_path = f"./extracted_text.txt"
            with open(txt_file_path, "w",encoding='utf-8') as txt_file:
                txt_file.write(text)
            difficulty = 'easy'
            previous = "What is the main topic discussed in this content?"
            input_prompt = f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the content provided. 
             Content: {text}
        Difficulty of Question is: {difficulty}
        Please look at the previous Question and make sure you don't continue the Question.
        Previous Question: {previous}
        """
            prompt = """
        Generate 1 question and return in JSON format exactly 1 question with 4 options and also the correct answer and a small solution, with JSON attributes named question, options, answer, solution.
        """
            response = model_vision.generate_content([input_prompt, prompt])
            clean_response = response.text.strip().replace("```json", "").replace("```", "")
            #print(clean_response)
            #print(type(clean_response))
            quiz_data = json.loads(clean_response)
            format='video'
            link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
            link_list = ast.literal_eval(link)
            first_link = link_list[0]
            return {
            "question": quiz_data['question'],
            "options": quiz_data['options'],
            "answer": quiz_data['answer'],
            "solution": quiz_data['solution'],
            "link":first_link
        }
    

        elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            text = extract_text_from_docx(file_content)
            txt_file_path = f"./extracted_text.txt"
            with open(txt_file_path, "w",encoding='utf-8') as txt_file:
                txt_file.write(text)
            difficulty = 'easy'
            previous = "What is the main topic discussed in this content?"
            input_prompt = f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the content provided. 
             Content: {text}
        Difficulty of Question is: {difficulty}
        Please look at the previous Question and make sure you don't continue the Question.
        Previous Question: {previous}
        """
            prompt = """
        Generate 1 question and return in JSON format exactly 1 question with 4 options and also the correct answer and a small solution, with JSON attributes named question, options, answer, solution.
        """
            response = model_vision.generate_content([input_prompt, prompt])
            clean_response = response.text.strip().replace("json", "").replace("", "")
            print(clean_response)
            print(type(clean_response))
            quiz_data = json.loads(clean_response)
            format='video'
            link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
            link_list = ast.literal_eval(link)
            first_link = link_list[0]

            return {
            "question": quiz_data['question'],
            "options": quiz_data['options'],
            "answer": quiz_data['answer'],
            "solution": quiz_data['solution'],
            "link":first_link
        }
        elif content_type == "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            text = extract_text_from_pptx(file_content)
            txt_file_path = f"./extracted_text.txt"
            with open(txt_file_path, "w",encoding='utf-8') as txt_file:
                txt_file.write(text)
            difficulty = 'easy'
            previous = "What is the main topic discussed in this content?"
            input_prompt = f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the content provided. 
             Content: {text}
        Difficulty of Question is: {difficulty}
        Please look at the previous Question and make sure you don't continue the Question.
        Previous Question: {previous}
        """
            prompt = """
        Generate 1 question and return in JSON format exactly 1 question with 4 options and also the correct answer and a small solution, with JSON attributes named question, options, answer, solution.
        """
            response = model_vision.generate_content([input_prompt, prompt])
            clean_response = response.text.strip().replace("json", "").replace("", "")
            print(clean_response)
            print(type(clean_response))
            quiz_data = json.loads(clean_response)
            format='video'
            link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
            link_list = ast.literal_eval(link)
            first_link = link_list[0]

            return {
            "question": quiz_data['question'],
            "options": quiz_data['options'],
            "answer": quiz_data['answer'],
            "solution": quiz_data['solution'],
            "link":first_link
        }

        elif content_type in ["image/jpeg", "image/png"]:
            image = Image.open(BytesIO(file_content))
            os.makedirs("./images", exist_ok=True)
            image_path = f"./images/saved_image.png"  # Save to a proper directory
            image.save(image_path)  #
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
            format='video'
            link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
            link_list = ast.literal_eval(link)
            first_link = link_list[0]
            return {
                "question":quiz_data['question'],
                "options":quiz_data['options'],
                "answer":quiz_data['answer'],
                "solution": quiz_data['solution'],
                "link":first_link
            }
        elif content_type == "audio/mpeg":
                audio = AudioSegment.from_file(BytesIO(file_content), format="mp3")
                wav_filename = f"temp.wav"
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
                format='video'
                link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
                link_list = ast.literal_eval(link)
                first_link = link_list[0]
                return {
                "question":quiz_data['question'],
                "options":quiz_data['options'],
                "answer":quiz_data['answer'],
                "solution":quiz_data['solution'],
                "link": first_link
                }
       

        elif content_type == "video/mp4":
            return {"filename": file.filename, "type": "Video file received"}
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    return {"filename": file.filename, "type": "Unknown file type"}

class NextQuestionRequest(BaseModel):
    type: str  

@app.post("/next_questions/")
async def next_question(request_data: NextQuestionRequest):
    content_type = request_data.type.lower()
    if content_type == "pdf":
        file_path= f"./extracted_text.txt"
        with open(file_path, "r", encoding="utf-8") as file:
            file_content = file.read()
        #print(file_content)    

        difficulty = 'easy'
        previous = "What is the main topic discussed in this content?"
        input_prompt = f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the content provided. 
             Content: {file_content}
        Difficulty of Question is: {difficulty}
        Please look at the previous Question and make sure you don't continue the Question.
        Previous Question: {previous}
        """
        prompt = """
        Generate 1 question and return in JSON format exactly 1 question with 4 options and also the correct answer and a small solution, with JSON attributes named question, options, answer, solution.
        """
        response = model_vision.generate_content([input_prompt, prompt])
        clean_response = response.text.strip().replace("```json", "").replace("```", "")
        #print(clean_response)
        #print(type(clean_response))
        quiz_data = json.loads(clean_response)
        format='video'
        link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
        link_list = ast.literal_eval(link)
        first_link = link_list[0]
        return {
            "question": quiz_data['question'],
            "options": quiz_data['options'],
            "answer": quiz_data['answer'],
            "solution": quiz_data['solution'],
            "link":first_link
        }    
            
    elif content_type in ["jpeg", "png"]:
            difficulty='easy'
            image_path = "./images/saved_image.png"
            image = Image.open(image_path)
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
            format='video'
            link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
            link_list = ast.literal_eval(link)
            first_link = link_list[0]
            return {
                "question":quiz_data['question'],
                "options":quiz_data['options'],
                "answer":quiz_data['answer'],
                "solution": quiz_data['solution'],
                "link":first_link
            }
    elif content_type == "mp3":
            file_path=r'temp.wav'
            audio = AudioSegment.from_wav(file_path)
            global_text_audio=Transcriber(audio)
            difficulty='easy'
            previous='Which of the following is NOT a common type of neural network used in deep learning?'
            input_prompt=f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the User domain which he is aking. Based on Topic  Generate.
            Topic : {global_text_audio} 
            Difficulty of Question is : {difficulty}
           
            Previous Question : {previous}
             Please look at previous Question make sure you don't repeat and try new type of questions.Completely different Question.

            generate 1 Questions and return in json format exactly 1 questions with 4 options and and also correct answer and small solution,with json attributes named question,options,answer,solution.
            """
            response = model_vision.generate_content(input_prompt)
            clean_response = response.text.strip().replace("```json", "").replace("```", "")
            quiz_data = json.loads(clean_response)
            format='video'
            link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
            print(link)
            link_list = ast.literal_eval(link)
            first_link = link_list[0]
            return {
                "question":quiz_data['question'],
                "options":quiz_data['options'],
                "answer":quiz_data['answer'],
                "solution": quiz_data['solution'],
                "link ": first_link
                }
    elif content_type == "docx":
        txt_file_path = f"./extracted_text.txt"
        with open(txt_file_path, "r", encoding="utf-8") as file:
            file_content = file.read()
        difficulty = 'easy'
        previous = "What is the main topic discussed in this content?"
        input_prompt = f"""You are a Quiz Generator AI. 
        Your task is to generate a set of quiz questions based on the content provided. 
             Content: {file_content}
        Difficulty of Question is: {difficulty}
        Please look at the previous Question and make sure you don't continue the Question.
        Previous Question: {previous}
        """
        prompt = """
        Generate 1 question and return in JSON format exactly 1 question with 4 options and also the correct answer and a small solution, with JSON attributes named question, options, answer, solution.
        """
        response = model_vision.generate_content([input_prompt, prompt])
        clean_response = response.text.strip().replace("json", "").replace("", "")
        print(clean_response)
        print(type(clean_response))
        quiz_data = json.loads(clean_response)
        format='video'
        link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
        link_list = ast.literal_eval(link)
        first_link = link_list[0]
        return {
            "question": quiz_data['question'],
            "options": quiz_data['options'],
            "answer": quiz_data['answer'],
            "solution": quiz_data['solution'],
            "link":first_link
        }    
    elif content_type=="pptx":
            txt_file_path = f"./extracted_text.txt"
            with open(txt_file_path, "r", encoding="utf-8") as file:
                file_content = file.read()
            difficulty = 'easy'
            difficulty = 'easy'
            previous = "What is the main topic discussed in this content?"
            input_prompt = f"""You are a Quiz Generator AI. 
            Your task is to generate a set of quiz questions based on the content provided. 
             Content: {file_content}
        Difficulty of Question is: {difficulty}
        Please look at the previous Question and make sure you don't continue the Question.
        Previous Question: {previous}
        """
            prompt = """
        Generate 1 question and return in JSON format exactly 1 question with 4 options and also the correct answer and a small solution, with JSON attributes named question, options, answer, solution.
        """
            response = model_vision.generate_content([input_prompt, prompt])
            clean_response = response.text.strip().replace("json", "").replace("", "")
            print(clean_response)
            print(type(clean_response))
            quiz_data = json.loads(clean_response)
            format='video'
            link=Answering(quiz_data['question'],quiz_data['answer'],quiz_data['options'],format)
            link_list = ast.literal_eval(link)
            first_link = link_list[0]
            return {
            "question": quiz_data['question'],
            "options": quiz_data['options'],
            "answer": quiz_data['answer'],
            "solution": quiz_data['solution'],
            "link":first_link
        }
    elif content_type == "mp4":
            return {"filename": file.filename, "type": "Video file received"}
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9000)
