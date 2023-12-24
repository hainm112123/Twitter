from sqlalchemy import String, ForeignKey, Integer, ARRAY
from sqlalchemy.orm import mapped_column, Mapped, relationship
from db import db
from dataclasses import dataclass
from init import bcrypt
from flask_login import UserMixin

# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get_or_404(id=int(user_id))

@dataclass
class User(db.Model): 
  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  name: Mapped[str] = mapped_column(String, nullable=False)
  username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
  hashed_password: Mapped[str] = mapped_column(String, nullable=False)
  followers: Mapped[list[int]] = mapped_column(ARRAY(Integer), default=[])
  following: Mapped[list[int]] = mapped_column(ARRAY(Integer), default=[])
  tweets: Mapped[list[int]] = mapped_column(ARRAY(Integer), default=[])

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
  