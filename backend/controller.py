from mongo import Clothes
from flask import jsonify


clothes_api = Clothes()

def get_all_clothes():
    try:
        clothes = clothes_api.get_all_clothes()
        return jsonify(clothes), 200
    except Exception as e:
        return jsonify({"message": 'error-' + str(e)}), 501
    

