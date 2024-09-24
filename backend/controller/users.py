from mongo import Users
from flask import jsonify
import bcrypt
import jwt
import datetime
SECRET_KEY = "267545f00571a7a7c4b36ec3256ddad5b0bf957dcc32dc2e9fd515a4738c2ba5"

user_api = Users()

def post_user(user):
    try: 
        password = user["password"]
        password_bytes = str(password).encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt)
        doccument = {
            "username": user["username"],
            "email": user["email"],
            "password": hashed_password
        }
        if hashed_password:
           print(hashed_password)
           result = user_api.insert_user(doccument)
           if result:
               return jsonify({'message': 'Acknowledged'}), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    
def auth_user(user):
    try:
        condition = user["email"]
        if "@" in condition:
            user2 = user_api.get_user_by_email(user["email"])
            print(user2)
            password  = bcrypt.checkpw(str(user["password"]).encode('utf-8'),user2["password"])
            if password:
                payload = {
            "user_id": user2["_id"],
            "email": user2["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
                token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                return jsonify({"token": token}), 200
            else:
                return jsonify({"massage": "icorrect password"}), 400
        else:
            user2 = user_api.get_user_by_email(user["email"])
            print(user2)
            password  = bcrypt.checkpw(str(user["password"]).encode('utf-8'),user2["password"])
            if password:
                payload = {
            "user_id": user2["_id"],
            "email": user2["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
                token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                return jsonify({"token": token}), 200
            else:
                return jsonify({"massage": "icorrect password"}), 400
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
   