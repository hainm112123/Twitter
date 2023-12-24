from os.path import join, dirname
import os
from datetime import timedelta

from dotenv import load_dotenv
from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import redis

from db import db

load_dotenv(join(dirname(__file__), '.env'))

ACCESS_EXPIRES = timedelta(hours=1)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:nmhcter132@127.0.0.1:5432/twitter'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)

db.init_app(app)

bcrypt = Bcrypt(app)

# login_manager = LoginManager(app)
# login_manager.init_app(app)

jwt = JWTManager(app)
jwt_redis_blocklist = redis.StrictRedis(
  host = "localhost", port = 6379, db = 0, decode_responses=True
)

CORS(app)