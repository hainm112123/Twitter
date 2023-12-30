from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models import Tweet
from db import db
import base64, re

tweet = Blueprint('tweet', __name__)

def to_bytes(b64_str): 
  return base64.decodebytes(b64_str.encode('utf-8'))

def to_base64(b_str):
  return re.sub("(\r\n)|(\n)|(\r)", "", base64.encodebytes(b_str).decode('utf-8'))

def configTweet(raw_tweet):
  tweet = raw_tweet.to_dict()
  tweet["photos"] = tweet["photos"] and list(map(to_base64, tweet["photos"]))
  tweet["video"] = tweet["video"] and to_base64(tweet["video"])
  return tweet

@tweet.route('/all')
def get_all_tweet(): 
  tweets = Tweet.query.order_by(Tweet.created_at).all()
  tweets.reverse()
  # return jsonify(tweets)
  return jsonify(list(map(configTweet, tweets)))

@tweet.route('/create', methods=['POST'])
@jwt_required()
def create_tweet():
  tweet = request.json
  # print(tweet)
  
  if "photos" in tweet and tweet["photos"]:
    tweet["photos"] = list(map(to_bytes, tweet["photos"]))
  
  if "video" in tweet and tweet["video"]:
    tweet["video"] = to_bytes(tweet["video"])
  
  new_tweet = Tweet(**tweet)
  db.session.add(new_tweet)
  db.session.commit()
  return {"msg": "success"}, 200