import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from reddit import reddit

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

@app.get("/subreddit/{subreddit_name}")
def get_subreddit_posts(subreddit_name: str, limit: int = 100):
    subreddit = reddit.subreddit(subreddit_name)
    
    # Get the current time and calculate the timestamp for 3 hours ago
    current_time = int(time.time())
    ten_hours_ago = current_time - (10 * 60 * 60)

    # Fetch posts and filter those submitted in the last 3 hours
    posts = [
        {
            "title": post.title,
            "created_utc": post.created_utc,
        }
        for post in subreddit.new(limit=limit)
        if post.created_utc >= ten_hours_ago
    ]
    
    return {"subreddit": subreddit_name, "posts": posts}

