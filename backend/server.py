from flask import Flask
from flask_cors import CORS
from routes import my_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(my_blueprint)

@app.route('/')
def home():
    return "Hello stylist, Flask is running on localhost:9020!"




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9020, debug=True)