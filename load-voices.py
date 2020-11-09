from google.oauth2 import service_account
from google.cloud import texttospeech as tts
from tqdm import tqdm

credentials = service_account.Credentials.from_service_account_file(
    "gcloud-service-key.json", scopes=["https://www.googleapis.com/auth/cloud-platform"],
)

client = tts.TextToSpeechClient(credentials=credentials)
voice = tts.VoiceSelectionParams(
    name="en-AU-Wavenet-D", language_code="en-AU", ssml_gender=tts.SsmlVoiceGender.MALE, 
)
audio_config = tts.AudioConfig(
    audio_encoding=tts.AudioEncoding.MP3,
    speaking_rate=1.5
)

phrases = ["rate"]
for i in range(10): phrases.append(f"0{i}")
for i in range(60): phrases.append(str(i))

for p in tqdm(phrases):
    response = client.synthesize_speech(
        input=tts.SynthesisInput(text=p),
        voice=voice,
        audio_config=audio_config
    )

    with open(f"public/mp3/{p}.mp3", "wb") as out:
        out.write(response.audio_content)