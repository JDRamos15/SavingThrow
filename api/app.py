import os
import datetime
from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
import datetime
from flask_sqlalchemy import SQLAlchemy
# UNCOMMENT FOR HEROKU
from .Models.User import userModel
from .commands import create_tables
from .extension import db

# from Models.User import userModel
# from commands import create_tables
# from extension import db

#testing, Used for cross-origin requests. Basically lets you call the endpoints from a different system without violating security
from flask_cors import CORS
# testing, must install in backend env
import flask_praetorian
# used for authentication for login and create account
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
from functools import wraps

def create_app():
    guard = flask_praetorian.Praetorian()

    app = Flask(__name__, static_folder='../build', static_url_path='/')

    # app.config.from_object('config.ProductionConfig')

    #use for heroku
    app.config.from_pyfile('settings.py')
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
    return app

app = create_app()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-acccess-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = userModel.query.filter_by(publicId=data['publicId']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route("/api/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        body = request.get_json()     
        uemail = body['email']
        upassword = body['password']

        if not body or not uusername or not upassword:
            return jsonify("Account does not exist", 404)

        user = userModel.query.filter_by(uusername = uusername).first()      

        if user:
            if check_password_hash(upassword, user.upassword.replace(" ", "")):
            # if user.upassword.replace(" ", "") == upassword:
                token = jwt.encode({'publicId' : user.publicId, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
                # return redirect(url_for('profile'))
                return jsonify({'token' : token.decode('UTF-8')})
            else:
                return jsonify("Incorrect email or password", 404)
        else:
            return jsonify("Account does not exist", 404)

    
    return "Method is not POST"


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
            upassword = generate_password_hash(body['password'], method='sha256')
            uusername = body['username']
            new_user = userModel(publicId=str(uuid.uuid4()),ufirst_name=ufirst_name, ulast_name=ulast_name, uemail= uemail, upassword= upassword, uusername= uusername)
            db.session.add(new_user)
            db.session.commit()
    
            return jsonify("Success"), 201
    
            
        return jsonify("Email or Username already is use"), 400

@app.route("/api/create-game", methods=['POST'])
def createGame():
    if request.method == 'POST':        
        body = request.get_json()
        print(body)
        name = body['name']
        dm_uid = body['dm_uid']
        description = body['description']
        start_date = body['start_date']
        date = datetime.now()
        new_campaign = userModel(ufirst_name=ufirst_name, ulast_name=ulast_name, uemail= uemail, upassword= upassword, uusername= uusername)
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify("Success", 201))

@app.route("/api/hello")
@token_required
def hello(current_user):
    return jsonify("tokenized!"), 201   


if __name__ == '__main__':
    app.run()


