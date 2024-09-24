from flask import Blueprint, render_template, request
from controller.users import post_user, auth_user
users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/register', methods=['POST'])
def register():
    user = request.get_json()
    print(user)
    return post_user(user)
    
@users_blueprint.route('/auth', methods=['POST'])
def auth():
    user = request.get_json()
    print(user)
    return auth_user(user)   