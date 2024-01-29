from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models import Tweet
from db import db
import base64, re, copy
from sqlalchemy import desc

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

def encodeTweet(tweet):
  if "photos" in tweet and tweet["photos"]:
    tweet["photos"] = list(map(to_bytes, tweet["photos"]))
  if "video" in tweet and tweet["video"]:
    tweet["video"] = to_bytes(tweet["video"])
  return Tweet(**tweet)

@tweet.route('/all')
def get_all_tweet(): 
  tweets = db.session.execute(db.select(Tweet.id).order_by(desc(Tweet.created_at))).scalars()
  return jsonify(list(tweets))
  # return jsonify(list(map(configTweet, tweets)))

@tweet.route('/get-by-author/<string:author>')
def get_by_author(author):
  tweets = db.session.execute(db.select(Tweet.id).order_by(desc(Tweet.created_at)).where(Tweet.author == author)).scalars()
  return jsonify(list(tweets))

@tweet.route('/get/<int:id>')
def get_tweet(id):
  tweet = Tweet.query.get_or_404(id)
  return jsonify(configTweet(tweet))

@tweet.route('/create', methods=['POST'])
@jwt_required()
def create_tweet():
  tweet = request.json
  # print(tweet)
  
  # if "photos" in tweet and tweet["photos"]:
  #   tweet["photos"] = list(map(to_bytes, tweet["photos"]))
  
  # if "video" in tweet and tweet["video"]:
  #   tweet["video"] = to_bytes(tweet["video"])
  
  # new_tweet = Tweet(**tweet)
  new_tweet = encodeTweet(tweet)
  db.session.add(new_tweet)
  db.session.commit()
  return {"msg": "success"}, 200

@tweet.route('/toggle-like', methods=['POST'])
@jwt_required()
def toggle_tweet():
  tweet = Tweet.query.get_or_404(int(request.json['tweet_id']))
  likes = copy.deepcopy(tweet.likes)
  try:
    index = tweet.likes.index(request.json['username'])
    print(index)
    likes.pop(index)
  except:
    likes = tweet.likes + [request.json['username']]
  tweet.likes = likes
  db.session.commit()
  return {"msg": "success"}, 200