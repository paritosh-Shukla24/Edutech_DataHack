# main.py (python example)
import os
from deepgram import (
    DeepgramClient,
    PrerecordedOptions,
    FileSource,
)
from deep_translator import GoogleTranslator
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("DEEPGAM_API_KEY")

def Transcriber(AUDIO_FILE):
    try:
        deepgram = DeepgramClient(api_key=api_key)

        with open(AUDIO_FILE, "rb") as file:
            buffer_data = file.read()

        payload: FileSource = {
            "buffer": buffer_data,
        }

        options = PrerecordedOptions(
            model="nova-2",
            smart_format=True,
            detect_language=True
        )

        response = deepgram.listen.prerecorded.v("1").transcribe_file(payload, options)

        #print(response.to_json(indent=4))
        transcript = response['results']['channels'][0]['alternatives'][0]['transcript']
        transcript=GoogleTranslator(source='hi', target='en').translate(transcript)
        return transcript

    except Exception as e:
        print(f"Exception: {e}")


