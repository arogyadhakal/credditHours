# Demo

# How to run application

1. First, clone the repository into any directory of your choosing.

2. After opening up the project, open a terminal within the project directory (/demo) and run this command to go into your the backend directory:
`cd backend`

3. Once you are in the backend directory, add your local virtual environment to run Python and the Python libraries with this command:
`python -m venv venv` which creates a virtual environment folder.

4. To activate the virtual environment (make sure you are still in the backend directory), run this command:
For Mac: `source venv/bin/activate`
For Windows: `venv/Scripts/activate`

5. After activating the virtual environment, you will have to install all of the dependencies for Python. All libraries work within *only* Python version 3.9. Run this command:
`pip install fastapi uvicorn praw nltk`
If the dependencies were not installed after, try running this command:
`pip3 install fastapi uvicorn praw nltk`

6. Within the same terminal, you will need to run the backend FastAPI server for the subreddit posts to be fetched. Run this command:
`uvicorn main:app --reload`

7. Once the backend server has began loading, open a new terminal within the project directory (/demo) and navigate to the subreddit=app directory by running:
`cd subreddit-app`

8. Once you are in the subreddit-app directory (/demo/subreddit-app), you will need to install all of the node packages by running:
`npm install`

9. After running that command, you are now able to start the frontend of the application by running:
`npm start`

After fully running, the React App will open at localhost:3000, and the FastAPI server will open at http://127.0.0.1:8000/docs
