from flask import Blueprint, render_template
from controller import get_all_clothes
# Define the blueprint
my_blueprint = Blueprint('clothes', __name__)

@my_blueprint.route('/clothes')
def clothes():
    return get_all_clothes()