"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
import json
from flask import current_app
from flask_bcrypt import Bcrypt
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, JWTManager
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


@api.route("/register", methods=["POST"])
def create_one_user():
    try:
        body = json.loads(request.data)
        raw_password = body.get("password")
        print(raw_password)
        password_hash = bcrypt.generate_password_hash(raw_password).decode("utf-8")
        new_user = User(
            username=body.get("username"),
            password=password_hash,
            name=body.get("name"),
            last_name=body.get("last_name"),
            email=body.get("email"),
            city=body.get("city"),
            phone_number=body.get("phone_number"),
            is_active=True
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "user created"}), 201

    except Exception as e:
        current_app.logger.error(f"error al crear el usuario:{str(e)}")
        return jsonify({"error": "ocurrio un error al procesar la solicitud"}), 500
