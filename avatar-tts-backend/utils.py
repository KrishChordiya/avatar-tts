import pyttsx3
import json
import subprocess

def text_to_wav(text, filename):
    # Initialize the text-to-speech engine
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[1].id)

    # Save the audio directly as a WAV file
    engine.save_to_file(text, f'{filename}.wav')
    engine.runAndWait()
    print(f"WAV file saved as {filename}.wav")

    # Run the lip sync tool
    subprocess.run(['Rhubarb-Lip-Sync-1.13.0-Windows/rhubarb.exe', '-f', 'json', f'{filename}.wav', '-o', 'output.json'])
