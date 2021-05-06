import os
#Here we change the database from local to production
# APP_SETTINGS = os.environ.get('APP_SETTINGS')
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') #Local that gets from the .env   
# SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') #Production enviroment
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_TRACK_MODIFICATIONS = False

