import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from reddit import reddit
from transformers import pipeline

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


# Initialize the sentiment analysis pipeline
nlp = pipeline("sentiment-analysis")

# creates a single sentiment score for all the posts
def analyze_sentiment(posts):
    output = []
    for post in posts:
        positive = 0
        negative = 0
        text = [post.title + " " + post.selftext]          
        for result in nlp(text):
            label = result['label']
            score = result['score']

            if label == 'POSITIVE':
                positive += score
            else:
                negative += score
        avg_positive = positive/len(text)
        output.append(avg_positive)

    return output

@app.get("/subreddit/{subreddit_name}")
def get_subreddit_posts(subreddit_name: str, limit: int = 100):
    subreddit = reddit.subreddit(subreddit_name)
    
    # Get the current time and calculate the timestamp for 10 hours ago
    current_time = int(time.time())
    ten_hours_ago = current_time - (100 * 60 * 60)

    # Fetch posts and filter those submitted in the last 10 hours
    posts = [
        post
        for post in subreddit.new(limit=limit)
        if post.created_utc >= ten_hours_ago
    ]
    
    sentiment_scores = analyze_sentiment(posts)
    scored_posts = []
    j = 0
    for post in posts:
         scored_posts.append({
            "title": post.title,
            "author": post.author.name,
            "link": post.url,
            "score": post.score,
            "created_utc": post.created_utc,
            "sentiment_scores": sentiment_scores[j]
         })
         j += 1

    # Add sentiment_scores to the posts

    
    return {"subreddit": subreddit_name, "posts": scored_posts}
