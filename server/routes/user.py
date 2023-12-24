from flask import Blueprint
from models import User
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

user = Blueprint('user', __name__)

@user.route('/all')
@jwt_required()
def get_all_users():
  users = User.query.all()
  return users

@user.route('/<int:id>')
@jwt_required()
def get_user(id):
  user = db.get_or_404(User, id)
  return user
