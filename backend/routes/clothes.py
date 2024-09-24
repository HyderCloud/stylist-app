from flask import Blueprint, render_template
from controller.cloths import get_all_clothes
# Define the blueprint
clothes_blueprint = Blueprint('clothes', __name__)

@clothes_blueprint.route('/clothes')
def clothes():
    return get_all_clothes()



