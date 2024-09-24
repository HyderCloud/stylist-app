from flask import Flask
from flask_cors import CORS
from routes.clothes import clothes_blueprint
from routes.users import users_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(users_blueprint)
app.register_blueprint(clothes_blueprint)

@app.route('/')
def home():
    return "Hello stylist, Flask is running on localhost:9020!"




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9020, debug=True)