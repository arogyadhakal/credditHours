import os
import praw

#Need to use OS so we set up environment variables instead of directly exposing our keys in our code/github repository

reddit = praw.Reddit(
    client_id='',
    client_secret='',
    user_agent='',
)
