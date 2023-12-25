from flask import Blueprint, request, jsonify
from forms import SignupForm, LoginForm
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from flask_cors import CORS, cross_origin

from models import User
from db import db
from init import jwt_redis_blocklist, ACCESS_EXPIRES, jwt

auth = Blueprint('auth', __name__)
# cors = CORS(auth, resources={r"/foo": {"origins": "http://localhost:3000"}})

@auth.route('/signup', methods=['POST'])
def signup():
  form = SignupForm(request.form)
  if form.validate_on_submit():
    user = User(name=form.name.data,
                username=form.username.data, 
                password=form.password.data)
    
    user.add()
    return {"msg": "success"}, 200
  else:
    return form.errors, 401

@auth.route('/login', methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def login():
  form = LoginForm(request.form)
  if form.validate_on_submit():
    user = User.query.filter_by(username=form.username.data).first()
    if user and user.check_password(attempted_password=form.password.data):
      access_token = create_access_token(identity=user)
      refresh_token = create_refresh_token(identity=user)
      return jsonify(access_token=access_token, refresh_token=refresh_token)
    else:
      return jsonify({"msg": "Wrong username or password"}), 401
  else:
    return form.errors

@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
  identity = get_jwt_identity()
  access_token = create_access_token(identity=identity)
  return jsonify(access_token)

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
  jti = jwt_payload['jti']
  token_in_redis = jwt_redis_blocklist.get(jti)
  return token_in_redis is not None

@auth.route('/logout', methods=['DELETE'])
@jwt_required(verify_type=False)
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def logout():
  token = get_jwt()
  jti = token['jti']
  token_type = token['type']
  jwt_redis_blocklist.set(jti, "", ex=ACCESS_EXPIRES)
  return jsonify(msg=f"{token_type.capitalize()} token successfully revoked")

