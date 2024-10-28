from flask import Flask, request, jsonify
from flask_cors import CORS
import os 

app = Flask(__name__)
CORS(app)  
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=['POST'])  
def upload_arquivos():
    prompt = request.form.get('prompt')
    
    if 'file' not in request.files:
        return jsonify({"error": "Arquivo não encontrado"}), 400

    # Processa cada arquivo enviado
    files = request.files.getlist('file')  # Obtém a lista de arquivos

    # Verifica se pelo menos um arquivo foi enviado
    if len(files) == 0:
        return jsonify({"error": "Nenhum arquivo selecionado"}), 400

    # Salva cada arquivo e prepara a resposta
    saved_files = []
    for file in files:
        if file.filename == '':
            return jsonify({"error": "Arquivo não selecionado"}), 400

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        saved_files.append(file.filename)

    response = {
        "message": "Dados recebidos com sucesso!",
        "prompt": prompt,
        "saved_files": saved_files
    }

    return jsonify(response), 200  # Retorna a resposta como JSON

if __name__ == '__main__':
    app.run(debug=True)
