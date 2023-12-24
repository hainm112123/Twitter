from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Length, EqualTo, DataRequired

class SignupForm(FlaskForm):
  class Meta: 
    csrf = False
  name = StringField(label='name', validators=[Length(min=4, max=30), DataRequired()])
  username = StringField(label='username', validators=[Length(min=4, max=20), DataRequired()])
  password = PasswordField(label='password', validators=[Length(min=6, max=30), DataRequired()])
  retype_password = PasswordField(label='retype_password', validators=[Length(min=6, max=30), DataRequired(), EqualTo('password')])
  submit = SubmitField(label='signup')
  
class LoginForm(FlaskForm):
  class Meta:
    csrf = False
  username = StringField(label='username', validators=[DataRequired()])
  password = StringField(label='password', validators=[DataRequired()])
  submit = SubmitField(label='login')
