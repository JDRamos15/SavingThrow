import os
from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from Models.User import db, userModel
import datetime
# testing, must install in backend env
import flask_praetorian
guard = flask_praetorian.Praetorian()

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#testing
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days' : 30}

 
db.init_app(app)
migrate = Migrate(app, db)


@app.route("/create-user", methods=['POST'])
def createUser():
    if request.method == 'GET':
        return "Login via the login Form"
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
    
            return make_response(jsonify("Success", 201))
      
            
        return make_response(jsonify("Email or Username already is use", 404))

# @app.route("/get-user", methods=['GET'])
# def getUser():

    
if __name__ == '__main__':
    app.run()