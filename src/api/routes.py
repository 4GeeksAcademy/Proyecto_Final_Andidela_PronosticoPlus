"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
import json
from flask import current_app
from flask_bcrypt import Bcrypt
from api.models import db, User, Country, City
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
bcrypt = Bcrypt()


CORS(api)


@api.route("/register", methods=["POST"])
def create_one_user():
    try:
        body = json.loads(request.data)
        raw_password = body.get("password")
        print(raw_password)
        password_hash = bcrypt.generate_password_hash(raw_password).decode("utf-8")
        country=Country.query.filter_by(name=body.get("country")).first()
        if not country:
            country=Country(name=body.get("country"))
            db.session.add(country)
            db.session.commit()
            db.session.refresh(country)
        city=City.query.filter_by(name=body.get("city")).first()
        if not city:
            city=City(name=body.get("city"),country_id=country.id)
            db.session.add(city)
            db.session.commit()
            db.session.refresh(city)
        new_user = User(
            username=body.get("username"),
            password=password_hash,
            name=body.get("name"),
            last_name=body.get("last_name"),
            email=body.get("email"),
            city_id=city.id,
            phone_number=body.get("phone_number"),
            is_active=True
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "user created"}), 201

    except Exception as e:
        current_app.logger.error(f"error al crear el usuario:{str(e)}")
        return jsonify({"error": "ocurrio un error al procesar la solicitud"}), 500

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user= User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg":"Invalid Password or Email"}), 401
    valid_password= current_app.bcrypt.check_password_hash(user.password, password)
    if valid_password is False:
        return jsonify({"msg":"Invalid Password or Email"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize())

@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_email = get_jwt_identity()
    current_user=User.query.filter_by(email=user_email).first()
    if not current_user:
        return jsonify({"error": "user not found"}), 404
    return jsonify(current_user.serialize()), 200