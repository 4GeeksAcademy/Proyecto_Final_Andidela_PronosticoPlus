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
        city=None
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

@api.route("/profile/edit", methods=["PUT"])
@jwt_required()
def edit_profile():
    try:
        body = json.loads(request.data)
        user_email = get_jwt_identity()
        current_user=User.query.filter_by(email=user_email).first()
        print(current_user)
        if not current_user:
            return jsonify({"error": "user not found"}), 404
        username=body.get("username",None)
        password=body.get("password",None)
        name=body.get("name",None)
        last_name=body.get("last_name",None)
        email=body.get("email",None)
        phone_number=body.get("phone_number",None)
        country_name=body.get("country",None)
        city_name=body.get("city",None)
        password_hash=None
        if password:
            if password.trim() != "":
                password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        if country_name:
            country=Country.query.filter_by(name=country_name).first()
            if not country:
                country=Country(name=country_name)
                db.session.add(country)
                db.session.commit()
                db.session.refresh(country)
        if city_name:
            city=City.query.filter_by(name=city_name).first()
            if not city:
                city=City(name=city_name,country_id=country.id)
                db.session.add(city)
                db.session.commit()
                db.session.refresh(city)

        current_user.username=username if username else current_user.username,
        if password_hash:   
            current_user.password=password_hash if password else current_user.password,
        current_user.name=name if name else current_user.name,
        current_user.last_name=last_name if last_name else current_user.last_name,
        current_user.email=email if email else current_user.email,
        current_user.city_id=city.id if city else current_user.city_id,
        current_user.phone_number=phone_number if phone_number else current_user.phone_number,
        
        db.session.commit()
        db.session.refresh(current_user)

        return jsonify({"msg": "user updated", "user": current_user.serialize()}), 201

    except Exception as e:
        current_app.logger.error(f"error al editar el usuario:{str(e)}")
        return jsonify({"error": "ocurrio un error al procesar la solicitud"}), 500
