from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import fitz  # PyMuPDF
import os
import requests
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer, util

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
document_text = ""
def extract_text_from_pdf(pdf_content):
    global document_text
    with fitz.open(stream=pdf_content, filetype="pdf") as doc:
        text = ""
        for page in doc:
            text += page.get_text()
    document_text = text
    return text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'document' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['document']    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.content_type == 'application/pdf':
        text = extract_text_from_pdf(file.read())
        return jsonify({"text": text}), 200
    else:
        return jsonify({"error": "Unsupported file type"}), 400

@app.route('/ask', methods=['POST'])
def ask_question():
    global document_text
    data = request.get_json()
    question =  data.get("question") + "answer in context of above research paper provided in 10 lines also state apporopriate lines from the research paper.If query is not in the context of research paper then respond ask user to enter appropriate query "
    
    # Check if document text is available
    if not document_text:
        return jsonify({"answer": "Please upload a document first."}), 400
    
    # Use ChatGPT API to generate response
    response = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "user", "content": document_text},
                {"role": "assistant", "content": question},
            ],
        }
    )
    print(response.text)
    if response.status_code == 200:
        # answer = response.json().get("choices")[0]['message']['content'].get("text", "No answer found.").strip()
        answer = response.json().get("choices")[0]['message']['content']
    else:
        answer = "Failed to get a response from OpenAI API."

    return jsonify({"answer": answer}), 200

if __name__ == '__main__':
    app.run(debug=True)
