from os.path import join, dirname
import os, sys
from datetime import timedelta
import logging
import boto3.session

from dotenv import load_dotenv
from flask import Flask, request, Response
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import redis
from flask_wtf import CSRFProtect
from flask_migrate import Migrate
from botocore.config import Config
from botocore.exceptions import ClientError

from db import db

load_dotenv(join(dirname(__file__), '.env'))

ACCESS_EXPIRES = timedelta(hours=2)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:nmhcter132@127.0.0.1:5432/twitter'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
# app.config['CORS_HEADERS'] = 'Content-Type'

# cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:3000"}})
cors = CORS()
cors.init_app(app)

# csrf = CSRFProtect()
# csrf.init_app(app)

def handle_preflight():
  if request.method == 'OPTIONS':
    return Response()

app.before_request(handle_preflight)

db.init_app(app)
migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

# login_manager = LoginManager(app)
# login_manager.init_app(app)

jwt = JWTManager(app)
jwt_redis_blocklist = redis.StrictRedis(
  host = "localhost", port = 6379, db = 0, decode_responses=True
)


endpoint = os.environ.get('ENDPOINT')
key_id_ro = os.environ.get('KEY_ID_RO')
application_key_ro = os.environ.get('APPLICATION_KEY_RO')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
b2session = boto3.session.Session(profile_name='twitter-dev')
b2 = b2session.resource(service_name='s3', endpoint_url=endpoint)
b2_client = b2session.client(service_name='s3', endpoint_url=endpoint)
# b2 = b2session.resource(service_name='s3', 
#                     aws_access_key_id=key_id_ro, 
#                     aws_secret_access_key=application_key_ro, 
#                     endpoint_url=endpoint, 
#                     config=Config(signature_version='s3v4'))

def upload_object(key, body):
  b2.Bucket(BUCKET_NAME).put_object(Key=key, Body=body)
  url = "%s/%s/%s" % (endpoint, BUCKET_NAME, key)
  return url

def get_public_url(extens):
  def get_url(name, body):
    return upload_object(name + extens, body)
  return get_url

upload_image = get_public_url('.png')
upload_video = get_public_url('.mp4')
