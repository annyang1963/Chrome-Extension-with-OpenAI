import requests
import openai

api_key = 'OpenAI key here'
headers = {
    'Authorization': f'Bearer {api_key}'
}
url = 'https://api.openai.com/v1/users/self'

response = requests.get(url, headers=headers)

if response.status_code == 200:
    rate_limit = int(response.headers['x-openai-reset']) - int(time.time())
    print(f'Rate limit will reset in {rate_limit} seconds.')
else:
    print('Failed to get rate limit.')
