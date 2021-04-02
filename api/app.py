import os
from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .Models.User import userModel
from .commands import create_tables
from .extension import db
import datetime
#testing, Used for cross-origin requests. Basically lets you call the endpoints from a different system without violating security
from flask_cors import CORS
# testing, must install in backend env
import flask_praetorian

guard = flask_praetorian.Praetorian()

app = Flask(__name__, static_folder='../build', static_url_path='/')

app.config.from_object('config.DevelopmentConfig')
# app.config.from_object(os.environ['APP_SETTINGS'])

#testing
# app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
# app.config['JWT_REFRESH_LIFESPAN'] = {'days' : 30}

db.init_app(app)
# CORS(app)

migrate = Migrate(app, db)
app.cli.add_command(create_tables)

# @app.route("/")
# def home():
#         return app.send_static_file('Home.js')

def getApp():
    return app

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route("/api/create", methods=['GET','POST'])
def createUser():
    if request.method == 'GET':
        return jsonify("Login via the login Form")
    if request.method == 'POST':        
        body = request.get_json()
        checkEmail = userModel.query.filter_by(uemail=body['email']).first()
        checkUserName = userModel.query.filter_by(uusername=body['username']).first()
        if checkEmail is None and checkUserName is None:
            ufirst_name = body['firstName']
            ulast_name = body['lastName']
            uemail = body['email']
            upassword = body['password']
            uusername = body['username']
            new_user = userModel(ufirst_name=ufirst_name, ulast_name=ulast_name, uemail= uemail, upassword= upassword, uusername= uusername)
            db.session.add(new_user)
            db.session.commit()
    
            return jsonify("Success"), 201
    
            
        return jsonify("Email or Username already is use"), 400

# @app.route("/get-user", methods=['GET'])
# def getUser():

    
if __name__ == '__main__':
    app.run()


