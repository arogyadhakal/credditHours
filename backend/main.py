import time
import nltk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from reddit import reddit
from transformers import pipeline
from nltk.sentiment import SentimentIntensityAnalyzer

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Allow requests from your React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


nltk.download('vader_lexicon')
# Initialize the sentiment intensity analyzer
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(posts):
    result = 0
    finalresult = 0
    for post in posts:
        text = (post.title + " " + post.selftext)
        result = sia.polarity_scores(text)
        finalresult = result['compound']
    print(finalresult)
    return finalresult



# Initialize the sentiment analysis pipeline
#nlp = pipeline("sentiment-analysis")

# creates a single sentiment score for all the posts
#def analyze_sentiment(posts):
#    for post in posts:
#        positive = 0
#        negative = 0
#        text = (post.title + " " + post.selftext)[:512]  # Truncate the text to 512 characters
#        if len(nlp(text)) > 1:
#            print(f'more than 1: {nlp(text)}')
#        result = nlp(text)[0]
#        label = result['label']
#        score = result['score']
#        if label == 'POSITIVE':
#            positive += score
#        else:
#            negative += score
#    output = (negative - positive) / len(posts)
#    print(output)
#    return output


@app.get("/subreddit/{subreddit_name}")
def get_subreddit_posts(subreddit_name: str, limit: int = 100):
    subreddit = reddit.subreddit(subreddit_name)
    
    # Get the current time and calculate the timestamp for 10 hours ago
    current_time = int(time.time())
    twentyfour_hours_ago = current_time - (24 * 60 * 60)

    # Fetch posts and filter those submitted in the last 10 hours
    posts = [
        post
        for post in subreddit.new(limit=limit)
        if post.created_utc >= twentyfour_hours_ago
    ]
    
    scored_posts = []
    j = 0
    for post in posts:
         scored_posts.append({
            "title": post.title,
            "id": post.id,
            "selftext": post.selftext,
            "author": post.author.name,
            "link": post.url,
            "score": post.score,
            "created_utc": post.created_utc,
            "sentiment_scores": analyze_sentiment([post]),
            "subreddit": post.subreddit.display_name
         })
         j += 1

    # Add sentiment_scores to the posts


    
    return {"subreddit": subreddit_name, "posts": scored_posts}

