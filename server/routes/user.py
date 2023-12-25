from flask import Blueprint, jsonify
from models import User
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

user = Blueprint('user', __name__)

def configUser(user):
  return {
    "id": user.id,
    "name": user.name,
    "username": user.username
  }

def configDict(user):
  return {
    "id": user['id'],
    "name": user['name'],
    "username": user['username']
  }

@user.route('/all')
@jwt_required()
def get_all_users():
  users = User.query.all()
  return jsonify(list(map(configUser, users)))

@user.route('/<int:id>')
@jwt_required()
def get_user(id):
  user = db.get_or_404(User, id)
  return jsonify(configUser(user))

@user.route('/user-identity')
@jwt_required()
def user_identity():
  user = get_jwt_identity()
  return jsonify(configDict(user))

@user.route('/others')
@jwt_required()
def others(): 
  users = User.query.all()
  user = get_jwt_identity()
  users = [_user for _user in users if _user.id != user["id"]]
  return users