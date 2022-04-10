import re
import string
import nltk
import pickle
nltk.download('stopwords')
stemmer = nltk.SnowballStemmer("english")
from nltk.corpus import stopwords
stopword=set(stopwords.words('english'))
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.templating import Jinja2Templates
from keras.preprocessing import sequence
import keras
from starlette.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

templates = Jinja2Templates(directory="templates/")
app.mount("/static", StaticFiles(directory="./static"), name="static")

load_model=keras.models.load_model("./Final_Sentiment_Analysis.h5")
with open('./Final_Sentiment_Tokenizer.pickle', 'rb') as handle:
   load_tokenizer1 = pickle.load(handle)

def clean_text(text):
    print(text)
    text = str(text).lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\n', '', text)
    text = re.sub('\w*\d\w*', '', text)
    print(text)
    text = [word for word in text.split(' ') if word not in stopword]
    text=" ".join(text)
    text = [stemmer.stem(word) for word in text.split(' ')]
    text=" ".join(text)
    return text

origins = [
    "http://localhost",
    "http://localhost:8000"
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/predict')
async def predict(test: Request): 
    print(test)
    test = await test.json()
    if not test:
        raise HTTPException(status_code=404, detail="Sentence field is required")
    test=[clean_text(test)]
    seq = load_tokenizer1.texts_to_sequences(test)
    padded = sequence.pad_sequences(seq, maxlen=300)
    pred = load_model.predict(padded)
    if pred<0.5:
        comment= "no hate"
    else:
        comment= "hate and abusive"
    print(comment)
    return comment

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)