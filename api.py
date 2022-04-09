import re
import string
import nltk
from text import Text
from fastapi.responses import HTMLResponse
nltk.download('stopwords')
stemmer = nltk.SnowballStemmer("english")
from nltk.corpus import stopwords
stopword=set(stopwords.words('english'))
import uvicorn
from fastapi import FastAPI, HTTPException, Request, Form
from fastapi.templating import Jinja2Templates
from keras.preprocessing.text import Tokenizer
from keras.preprocessing import sequence
import keras
from starlette.staticfiles import StaticFiles
from starlette.responses import FileResponse

app = FastAPI()

templates = Jinja2Templates(directory="templates/")
app.mount("/static", StaticFiles(directory="./static"), name="static")

load_model=keras.models.load_model("./hate&abusive_model.h5")

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

@app.get('/')
async def index(request: Request):
    return templates.TemplateResponse("./index.html", {"request": request})

@app.post('/predict')
async def predict(test: str = Form("Fuck you")): 
    if not test:
        raise HTTPException(status_code=404, detail="Sentence field is required")
    test=[clean_text(test)]
    max_words = 50000
    tokenizer = Tokenizer(num_words=max_words)
    tokenizer.fit_on_texts(test)
    seq = tokenizer.texts_to_sequences(test)
    padded = sequence.pad_sequences(seq, maxlen=300)
    pred = load_model.predict(padded)
    if pred<0.5:
        comment= "no hate"
    else:
        comment= "hate and abusive"
    prediction_text='The comment is :{}'.format(comment)
    return HTMLResponse(content=prediction_text, status_code=200)


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)

#     # return FileResponse('./index.html',content=prediction_text)
#  return templates.TemplateResponse("./index.html",content= {"request": request, "result":prediction_text})