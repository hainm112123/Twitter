from sqlalchemy import String, ForeignKey, Integer, ARRAY, LargeBinary, DateTime, PickleType, Boolean
from sqlalchemy.orm import mapped_column, Mapped, relationship
from db import db
from dataclasses import dataclass
from init import bcrypt
from flask_login import UserMixin
import base64
from datetime import datetime

# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get_or_404(id=int(user_id))

@dataclass
class User(db.Model): 
  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  name: Mapped[str] = mapped_column(String, nullable=False)
  username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
  hashed_password: Mapped[str] = mapped_column(String, nullable=False)
  followers: Mapped[list[str]] = mapped_column(ARRAY(String), default=[])
  following: Mapped[list[str]] = mapped_column(ARRAY(String), default=[])
  tweets: Mapped[list[int]] = mapped_column(ARRAY(Integer), default=[])
  avatar: Mapped[str] = mapped_column(String, nullable=True)
  cover: Mapped[str] = mapped_column(String, nullable=True)
  bio: Mapped[str] = mapped_column(String, default="")
  joined_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

  def add(self):
    db.session.add(self)
    db.session.commit()

  @property
  def password(self):
    return self.password
  
  @password.setter
  def password(self, plain_password):
    self.hashed_password = bcrypt.generate_password_hash(plain_password).decode('utf-8')
  
  def check_password(self, attempted_password):
    return bcrypt.check_password_hash(self.hashed_password, attempted_password)
  
@dataclass
class Tweet(db.Model):
  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  author: Mapped[str] = mapped_column(String)
  text: Mapped[str] = mapped_column(String, default="")
  photos: Mapped[list[str]] = mapped_column(ARRAY(String), default=[])
  video: Mapped[str] = mapped_column(String, nullable=True)
  likes: Mapped[list[str]] = mapped_column(ARRAY(String), default=[])
  retweets: Mapped[list[str]] = mapped_column(ARRAY(String), default=[])
  replies: Mapped[list[int]] = mapped_column(ARRAY(Integer), default=[])
  views: Mapped[int] = mapped_column(Integer, default=0)
  created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
  is_reply_of: Mapped[int] = mapped_column(Integer, nullable=True)
  
  def to_dict(self):
    return {col.name: getattr(self, col.name) for col in self.__table__.columns}
  