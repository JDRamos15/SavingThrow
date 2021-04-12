import os
import datetime
from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from Models.User import userModel
from Models.Campaign import campaignModel
from Models.characterSheets import characterSheetModel
from commands import create_tables
from extension import db


#testing, Used for cross-origin requests. Basically lets you call the endpoints from a different system without violating security
from flask_cors import CORS
# testing, must install in backend env
import flask_praetorian
# used for authentication for login and create account
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
from functools import wraps

UPLOAD_FOLDER = './media'
ALLOWED_EXTENSIONS = set({'pdf', 'png', 'jpg', 'jpeg'})



def create_app():
    guard = flask_praetorian.Praetorian()

    app = Flask(__name__, static_folder='../build', static_url_path='/')

    # app.config.from_object('config.ProductionConfig')

    #use for heroku
    app.config.from_pyfile('settings.py')
    # app.config.from_object(os.environ['APP_SETTINGS'])
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
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

# send x-access-token with the value of the token stored in the front end as a parameter in the POST method when calling a 
# route that requires a user to be signed in.
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

@app.route('/', methods=['GET', 'POST'])
def index():
    return app.send_static_file('index.html')


@app.route("/api/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        body = request.get_json()     
        uusername = body['username']
        upassword = body['password']

        user = userModel.query.filter_by(uusername=body['username']).first()      

        if user:
            check = user.upassword.replace(" ", "")
            # check_password_hash(HASH_PASSWORD, REGULAR_PASSWORD)
            if check_password_hash(check, upassword):
                # encodes publicId to create an access token to be sent to front end, current duration 8 hours(can be change to minutes=10 for testing)
                token = jwt.encode({'publicId' : user.publicId, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=8)}, app.config['SECRET_KEY'])
                return jsonify({
                    'status' : "Success",
                    'token' : token.decode('UTF-8'),
                    'username' : uusername,
                    'user_id' : user.uid,
                    'public_id' : user.publicId,
                    'loggedIn' : True
                    })
            else:
                return jsonify({'error' : "Incorrect email or password"}), 404
        else:
            return jsonify({'error' : "Incorrect email or password"}), 404

    
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
    
            
        return jsonify({
            'error' : "Email or Username already in use."
        }), 401
        # jsonify("Email or Username already is use"), 400

@app.route("/api/create-game", methods=['POST'])
@token_required
def createGame():
    if request.method == 'POST':        
        body = request.get_json()
        name = body['name']
        dm_uid = body['dm_uid']
        description = body['description']
        if(description == ""):
            description = None
        start_date = body['start_date']
        looking_for = body['looking_for']
        date_updated = datetime.datetime.now().replace(microsecond=0)
        password = body['password']
        if(password == ""):
            password = None
        ccapacity = body['capacity']
        new_campaign = campaignModel(cname=name, dm_uid=dm_uid, cdescription=description,start_date=start_date,looking_for=looking_for,date_updated=date_updated,password=password,ccapacity=ccapacity)
        db.session.add(new_campaign)
        db.session.commit()

        return make_response(jsonify("Success", 201))


@app.route("/api/getgames", methods=['GET'])
def getGames():
    if request.method == 'GET':        
        body = request.get_json()
        campaignToDelete = campaignModel.query.filter_by(cmid=body['cmid']).first()
        db.session.delete(campaignToDelete)
        db.session.commit()

        return make_response(jsonify("Success", 201))
    
@app.route("/api/delete-game", methods=['POST'])
def deleteGame():
    if request.method == 'POST':        
        body = request.get_json()
        campaignToDelete = campaignModel.query.filter_by(cmid=body['cmid']).first()
        db.session.delete(campaignToDelete)
        db.session.commit()

        return make_response(jsonify("Success", 201))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api/create-charactersheet", methods=['POST'])
def createCharacterSheet():
    if request.method == 'POST':   
        file = request.files['characterSheet']
        if file and allowed_file(file.filename):
            cs_path = str(uuid.uuid4())
            filename = file.filename
            date_created = datetime.datetime.now().replace(microsecond=0)
            date_updated = datetime.datetime.now().replace(microsecond=0)
            destination="/characterSheets/".join([UPLOAD_FOLDER, cs_path])
            file.save(destination)
            new_characterSheet = characterSheetModel(cs_path=cs_path, name=filename, date_created=date_created, date_updated=date_updated)
            db.session.add(new_characterSheet)
            db.session.commit()
            return make_response(jsonify("Success", 201))

@app.route("/api/hello")
@token_required
def hello(current_user):
    return jsonify("tokenized!"), 201   


if __name__ == '__main__':
    app.run()


