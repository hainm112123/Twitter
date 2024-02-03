from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
import base64, re, copy, boto3, uuid
from sqlalchemy import desc
from init import upload_image, upload_video

from models import Tweet
from db import db

tweet = Blueprint('tweet', __name__)

def to_bytes(b64_str): 
  return base64.decodebytes(b64_str.encode('utf-8'))

def to_base64(b_str):
  return re.sub("(\r\n)|(\n)|(\r)", "", base64.encodebytes(b_str).decode('utf-8'))

def configTweet(raw_tweet):
  tweet = raw_tweet.to_dict()
  # tweet["photos"] = tweet["photos"] and list(map(to_base64, tweet["photos"]))
  # tweet["video"] = tweet["video"] and to_base64(tweet["video"])
  return tweet

def photo_map(prefix, photos):
  res = []
  for i in range(len(photos)):
    res.append(upload_image(prefix+'_photo_'+str(i), to_bytes(photos[i])))
  return res

def encodeTweet(tweet):
  prefix = 'tweet_' + uuid.uuid4().hex + '_'
  if "photos" in tweet and tweet["photos"]:
    # tweet["photos"] = list(map(to_bytes, tweet["photos"]))
    tweet["photos"] = list(photo_map(prefix, tweet["photos"]))
  if "video" in tweet and tweet["video"]:
    tweet["video"] = upload_video(prefix+'_video', to_bytes(tweet["video"]))
  return Tweet(**tweet)


@tweet.route('/all')
def get_all_tweet(): 
  tweets = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where(Tweet.is_reply_of == None)).scalars()
  return jsonify(list(tweets))
  # return jsonify(list(map(configTweet, tweets)))

@tweet.route('/replies/<int:tweet_id>')
def get_replies(tweet_id):
  replies = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where(Tweet.is_reply_of == tweet_id)).scalars()
  return jsonify(list(replies))

@tweet.route('/get-by-author/<string:author>')
def get_by_author(author):
  tweets = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where((Tweet.author == author) & (Tweet.is_reply_of  == None))).scalars()
  return jsonify(list(tweets))

@tweet.route('/get/<int:id>')
def get_tweet(id):
  tweet = Tweet.query.get_or_404(id)
  # return jsonify(configTweet(tweet))
  return jsonify(tweet)

@tweet.route('/get-parent-tweet/<int:id>')
def get_parent_tweet(id):
  tweet = db.session.execute(db.select(Tweet.is_reply_of).where(Tweet.id == id)).scalar()
  return jsonify(tweet)

@tweet.route('/get-author/<int:id>')
def get_author(id):
  author = db.session.execute(db.select(Tweet.author).where(Tweet.id == id)).scalar()
  return jsonify(author)

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
  if new_tweet.is_reply_of:
    parent = Tweet.query.get_or_404(new_tweet.is_reply_of)
    replies = copy.deepcopy(parent.replies)
    replies.append(new_tweet.id)
    parent.replies = replies

  db.session.commit()
  return jsonify(new_tweet), 200

@tweet.route('/toggle-like', methods=['POST'])
@jwt_required()
def toggle_like():
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
  return jsonify(tweet), 200