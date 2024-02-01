from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import base64, re, boto3

from models import User
from db import db
from init import upload_image

user = Blueprint('user', __name__)

def configUser(user):
  return {
    "id": user.id,
    "name": user.name,
    "username": user.username,
    "bio": user.bio,
    "joined_date": user.joined_date,
    "followers": user.followers,
    "following": user.following,
    "tweets": user.tweets,
    "avatar": user.avatar and re.sub("(\r\n)|(\n)|(\r)", "", base64.encodebytes(user.avatar).decode('utf-8')),
    "cover": user.cover and re.sub("(\r\n)|(\n)|(\r)", "", base64.encodebytes(user.cover).decode('utf-8')),
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
  # return jsonify(list(map(configUser, users)))
  return jsonify(users)

@user.route('/user-info/<string:username>')
@jwt_required()
def get_user(username):
  user = User.query.filter_by(username=username).first_or_404()
  # return jsonify(configUser(user))
  return jsonify(user)

@user.route('/user-identity')
@jwt_required()
def user_identity():
  user = User.query.get_or_404(get_jwt_identity()["id"])
  # return jsonify(configUser(user))
  return jsonify(user)

@user.route('/others')
@jwt_required()
def others(): 
  users = User.query.all()
  user = get_jwt_identity()
  users = [_user for _user in users if _user.id != user["id"]]
  # return jsonify(list(map(configUser, users)))
  return jsonify(users)

@user.route('/update-bio', methods=['POST'])
@jwt_required()
def update_bio():
  user = User.query.get_or_404(get_jwt_identity()["id"])
  new_user_bio = request.json
  for key in new_user_bio:
    if new_user_bio[key]:
      # print(key, type(new_user_bio[key]))
      # continue
      if (key == 'cover' or key == 'avatar'):
        # setattr(user, key, base64.decodebytes(new_user_bio[key].encode('utf-8')))
        object_key = user.username+'_'+key
        url = upload_image(object_key, base64.decodebytes(new_user_bio[key].encode('utf-8')))
        setattr(user, key, url)
      else:
        setattr(user, key, new_user_bio[key])
  # if (new_user_bio["name"]):
  #   user.name = new_user_bio["name"]
  # if (new_user_bio["bio"]):
  #   user.bio = new_user_bio["bio"]
  # if ("cover" in new_user_bio and new_user_bio["cover"]):
  #   user.cover = base64.decodebytes(new_user_bio["cover"].encode('utf-8'))
  # if ("avatar" in new_user_bio and new_user_bio["avatar"]):
  #   user.avatar = base64.decodebytes(new_user_bio["avatar"].encode('utf-8'))
  db.session.commit()
  return {"msg": "success"}, 200
