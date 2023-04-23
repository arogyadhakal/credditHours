# demo

1. First add your local virtual environment to run Python and the Python libraries
Navigate to the backend folder by doing "cd backend"
Run "python -m venv venv" to create the venv folder

2. Activate the Virtual Environment (make sure you are in the backend directory)
"venv\Scripts\activate"

3. Install the dependencies for Python
"pip install fastapi uvicorn praw transformers torch tensorflow nltk"

4. Run the backend FastAPI Server
"uvicorn main:app --reload"

5. Navigate to the subreddit-app folder and run the web app
   "cd .."
   "cd subreddit-app"
   "npm start"

After fully running, the React App will open at localhost:3000
After fully running, the FastAPI server will open at http://127.0.0.1:8000/docs
