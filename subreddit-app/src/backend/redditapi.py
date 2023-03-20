CLIENT_ID = 'WuGZuo8Ri5BhDfFWM-KNVw'
SECRET_KEY = 'Lpn063Fjuhx71jYE9ouVFTzUEMVA4A'

import requests

auth = requests.auth.HTTPBasicAuth(CLIENT_ID, SECRET_KEY)

#with open('pw.txt', 'r') as file:
#    pw = file.read()

data = {
    'grant_type': 'password',
    'username': 'ApprehensiveOne4579',
    'password': 'RedditCOMP523'
}

headers = {'User-Agent': 'cReddit Hours'}

res = requests.post('https://www.reddit.com/api/v1/access_token',
                                        auth=auth, data=data, headers=headers)

TOKEN = res.json()['access_token']

headers = {**headers, **{'Authorization': f'bearer {TOKEN}'}}

requests.get('https://oauth.reddit.com/api/v1/me', headers=headers)

res = requests.get("https://oauth.reddit.com/r/unc/",
                   headers=headers)

print(res.json())