from flask import Flask, request, jsonify
import openai
import tiktoken

from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


openai.api_key = 'OpenAI key here'

@app.route('/')
def index():
    return 'Welcome to the GPT-3.5-turbo Assistant!'

@app.route('/process', methods=['POST'])
def process():
    model = "gpt-3.5-turbo"
    
    content = request.get_json()
    # print(content)
    question = content['question']
    text = content['text']
    max_tokens = 200


    
    # count the input token
    encoding = tiktoken.get_encoding("cl100k_base")
    encoding = tiktoken.encoding_for_model(model)
    token = encoding.encode(text)
    num_tokens = len(token)

    
    if num_tokens > 0.8*max_tokens:
        # Truncate the text to the maximum number of tokens
        text = encoding.decode(token[:int(max_tokens*0.8)])

    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": question},
        {"role": "assistant", "content": f"The text on the webpage is: {text}"}

    ]
    # test code, set to True to avoid calling openapi
    if False:
        res = jsonify({"answer": "test test"})
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res
    
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        max_tokens=max_tokens,  # Adjust this value based on how long you want the answer to be
        temperature=0.7,  # Adjust this value to control the randomness of the generated answer (0.0 to 1.0)
        n=1
    )

    if response and response.choices:
        answer = response.choices[0].message.content.strip()
        result = {'answer': answer}
    else:
        result = {'error': 'Failed to generate an answer'}
    
    res = jsonify(result)
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


if __name__ == '__main__':
    app.run(debug=True)
