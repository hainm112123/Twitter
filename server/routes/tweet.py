from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import base64, re, copy, boto3, uuid
from sqlalchemy import desc, join, select
from sqlalchemy.orm import aliased, joinedload
from init import upload_image, upload_video

from models import Tweet, User, Post
from db import db

tweet = Blueprint('tweet', __name__)

tweetalias = aliased(Tweet)

per_page = 10

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
def get_all_tweets(): 
  tweets_count = int(request.args.get('tweets-count'))
  # tweets = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where(Tweet.is_reply_of == None).slice(tweets_count, tweets_count + per_page)).scalars()
  tweets = db.session.query(Tweet).order_by(desc(Tweet.created_at)).where(Tweet.is_reply_of == None).slice(tweets_count, tweets_count + per_page).options(joinedload(Tweet.original_tweet)).all()
  return jsonify(list(tweets))

postalias = aliased(Post)
@tweet.route('/test')
def test():
  # posts = db.session.query(Post.id, Post.author, Post.is_repost_of, Post.original_post).outerjoin(postalias.original_post).all()
  posts = db.session.query(Post).order_by(desc(Post.id)).slice(0, 1).options(joinedload(Post.original_post))
  print(posts)
  result = []
  for post in posts:
      # If it's a repost, include additional data from the original post
      if post.is_repost_of is not None:
          original_post_data = {
              'id': post.original_post.id,
              'author': post.original_post.author,
              'text': post.original_post.text
          }
          post_data = {
              'id': post.id,
              'author': post.author,
              'text': None,  # No text for repost
              'is_repost_of': post.is_repost_of,
              'original_post': original_post_data
          }
      else:
          # If it's not a repost, include the regular post data
          post_data = {
              'id': post.id,
              'author': post.author,
              'text': post.text,
              'is_repost_of': post.is_repost_of,
              'original_post': None  # No original post for regular post
          }
      result.append(post_data)
  return result

@tweet.route('/following')
@jwt_required()
def get_following_tweets():
  user = User.query.get_or_404(get_jwt_identity()['id'])
  tweets_count = int(request.args.get('tweets-count'))
  tweets = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where(Tweet.author in user.following)).scalars()
  tweets = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where((Tweet.is_reply_of == None) & (Tweet.author.in_(user.following))).slice(tweets_count, tweets_count + per_page)).scalars()
  return jsonify(list(tweets))

@tweet.route('/replies/<int:tweet_id>')
def get_replies(tweet_id):
  count = int(request.args.get('tweets-count'))
  replies = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where(Tweet.is_reply_of == tweet_id).slice(count, count + per_page)).scalars()
  return jsonify(list(replies))

@tweet.route('/get-by-author/<string:author>')
def get_by_author(author):
  count = int(request.args.get('tweets-count'))
  tweets = db.session.execute(db.select(Tweet).order_by(desc(Tweet.created_at)).where((Tweet.author == author) & (Tweet.is_reply_of  == None)).slice(count, count + per_page)).scalars()
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
    likes.pop(index)
  except:
    likes = tweet.likes + [request.json['username']]
  tweet.likes = likes
  db.session.commit()
  return jsonify(tweet), 200

@tweet.route('/toggle-retweet', methods=['POST'])
@jwt_required()
def toggle_retweet(): 
  tweet_id = int(request.json['tweet_id'])
  tweet = Tweet.query.get_or_404(tweet_id)
  username = request.json['username']
  retweets = copy.deepcopy(tweet.retweets)
  try: 
    index = tweet.retweets.index(request.json['username'])
    retweet = db.session.execute(db.select(Tweet).where(Tweet.is_retweet_of == tweet_id and Tweet.author == username)).scalar()
    retweets.pop(index)
    db.session.delete(retweet)
  except: 
    retweets.append(username)
    retweet = Tweet(author=username, is_retweet_of=tweet_id)
    db.session.add(retweet)
  
  tweet.retweets = retweets
  db.session.commit()
  return jsonify(tweet), 200