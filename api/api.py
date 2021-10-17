from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello World?? reload!"


dados = {
    "usuarios": [
        {
            "login": "KauanAmorim",
            "password": "estudo123",
        }
    ],
    "mensagem": [
        {
            "usuario": "Lucas",
            "texto": "Oi",
            "id": "1"
        },
        {
            "usuario": "Karol",
            "texto": "Oi xD",
            "id": "2"
        },
        {
            "usuario": "Lucas",
            "texto": "Tudo bem?",
            "id": "3"
        },
        {
            "usuario": "Karol",
            "texto": "Tudo sim! E você?",
            "id": "4"
        },
        {
            "usuario": "Lucas",
            "texto": "Estou bem :D",
            "id": "5"
        }
    ]
}


@app.route("/mensagem")
def get_alunos():
    return jsonify(dados["mensagem"])


@app.route("/usuarios")
def listar_usuarios():
    return jsonify(dados["usuarios"])


@app.route("/usuarios", methods=["POST"])
def cadastro_usuario():
    json_data = request.json
    for usuario in dados["usuarios"]:
        usuario_existe = usuario["login"] == json_data["login"]
        if usuario_existe:
            return jsonify({"valid": False, "error": "Usuario já existe"}), 400

    dados["usuarios"].append({
        "login": json_data["login"],
        "password": json_data["password"],
    })

    return '', 201


@app.route("/auth", methods=["POST"])
def autentica():
    json_data = request.json
    for usuario in dados["usuarios"]:
        usuario_existe = usuario["login"] == json_data["login"]
        if usuario_existe:
            senha_correta = usuario["password"] == json_data["password"]
            if senha_correta:
                return '', 204
            else:
                return jsonify({
                    "valid": False,
                    "error": "Senha inválida"
                }), 401

    return jsonify({"valid": False, "error": "Usuario inexistente"}), 404


if __name__ == '__main__':
    app.run(host='localhost', port=5002, debug=True)
