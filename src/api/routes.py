"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from sqlalchemy import select

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! Estas en el Back"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    print(email)
    password = request.json.get("password", None)
    
    #user=User.query.filter_by(email=email).first()
    user = db.session.execute(select(User).where(User.email ==email)).scalar_one_or_none()
    if user is None: 
        return jsonify({"msg": "Bad username or password"}), 401
    print(user)

    #if email != user.email or password !=user.password:
    if password !=user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

