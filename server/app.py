from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from db import db
from routes.user import user 
from routes.auth import auth
from routes.tweet import tweet
from init import app
from models import User
from flask_wtf import csrf

with app.app_context():
  db.create_all()

@app.route('/')
def index():
  return "api server"

@app.route('/get-csrf-token')
def get_csrf_token():
  return jsonify(csrf.generate_csrf())

# @app.route('/validate-csrf-token/<token>')
# def validate_csrf_token(token):
#   return jsonify(csrf.validate_csrf(data=token))

app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(tweet, url_prefix='/tweet')

if __name__ == "__main__":
  app.run(debug=True, port=8000)