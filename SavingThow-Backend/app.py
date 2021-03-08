import os
from flask import Flask, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from Models.User import db, userModel

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

 
db.init_app(app)
migrate = Migrate(app, db)


@app.route("/create-user", methods=['POST'])
def createUser():
    if request.method == 'GET':
        return "Login via the login Form"
    if request.method == 'POST':
        body = request.get_json()
        ufirst_name = body['firstName']
        ulast_name = body['lastName']
        uemail = body['email']
        upassword = body['password']
        new_user = userModel(ufirst_name=ufirst_name, ulast_name=ulast_name, uemail= uemail, upassword= upassword)
        db.session.add(new_user)
        db.session.commit()
        return f"Done!!"

if __name__ == '__main__':
    app.run()