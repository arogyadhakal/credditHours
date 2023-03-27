import os
import praw

#Need to use OS so we set up environment variables instead of directly exposing our keys in our code/github repository

reddit = praw.Reddit(
    client_id='hM78wGucJ8O-mf9rFPzbWw',
    client_secret='SDxFy2RxY-jDRC1yVh14OvzFfCUp7A',
    user_agent="chours",
)
