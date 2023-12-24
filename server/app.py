from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from db import db
from routes.user import user 
from routes.auth import auth
from init import app
from models import User

with app.app_context():
  db.create_all()

@app.route('/')
def index():
  return "api server"

app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(auth, url_prefix='/auth')

if __name__ == "__main__":
  app.run(debug=True, port=8000)