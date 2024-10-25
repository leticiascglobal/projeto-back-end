from flask import Flask,request,jsonify
from flask_cors import CORS
app = Flask(__name__)


@app.route("/upload", method=['POST'])
def upload_arquivos():
    file = request.files.get('file')
    prompt = request.form.get('prompt')

    response = {
        "message": "Dados recebidos com sucesso!",
        "prompt": prompt
    }

    return jsonify(response), 200
if __name__ == '__main__':
    app.run(debug=True)