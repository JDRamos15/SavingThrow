import os
import datetime
from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
# Accept incoming changes

# UNCOMMENT FOR HEROKU
from .Models.User import userModel
from .Models.Campaign import campaignModel
from .Models.characterSheets import characterSheetModel
from .Models.Room import roomModel
from .commands import create_tables
from .extension import db

# from Models.User import userModel
# from Models.Campaign import campaignModel
# from Models.characterSheets import characterSheetModel
# from Models.Room import roomModel
# from commands import create_tables
# from extension import db


#testing, Used for cross-origin requests. Basically lets you call the endpoints from a different system without violating security
from flask_cors import CORS
# testing, must install in backend env
# used for authentication for login and create account
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
from functools import wraps
from flask_socketio import SocketIO, join_room, leave_room, send, close_room
import random
from flask.ext.cors import cross_origin

UPLOAD_FOLDER = './media'
ALLOWED_EXTENSIONS = set({'pdf', 'png', 'jpg', 'jpeg'})




app = Flask(__name__, static_folder='../build', static_url_path='/')

# app.config.from_object('config.ProductionConfig')

#use for heroku
app.config.from_pyfile('settings.py')
# app.config.from_object(os.environ['APP_SETTINGS'])

# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#testing


db.init_app(app)

migrate = Migrate(app, db)
app.cli.add_command(create_tables)   

cors = CORS(app,resources={r"/api/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


# send x-access-token with the value of the token stored in the front end as a parameter in the POST method when calling a 
# route that requires a user to be signed in.
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-Access-Token' in request.headers:
            token = request.headers['x-Access-Token']  
        if not token:
            return jsonify({'status' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
            current_user = userModel.query.filter_by(publicId=data['publicId']).first()
        except:
            return jsonify({'status' : 'Token is invalid!'}), 401

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
                token = jwt.encode({'publicId' : user.publicId, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hours=8)}, app.config['SECRET_KEY'], algorithm="HS256")
                return jsonify({
                    'status' : "Success",
                    'token' : token,
                    'username' : uusername,
                    'user_id' : user.uid,
                    'public_id' : user.publicId,
                    'loggedIn' : True,
                    'fname': user.ufirst_name
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


@app.route("/api/user", methods=['POST', 'GET'])
@token_required
def getUser(current_user):
    if request.method == 'POST':
        body = request.get_json()
        publicid = body['publicId'].replace('"', '')
        checkPublicId = userModel.query.filter_by(publicId=publicid).first()
        if checkPublicId is None:
            return jsonify({'status' : "User does not exist"})
        else:
            return jsonify({
                    'status' : "Success",
                    'username' : checkPublicId.uusername,
                    'user_id' : checkPublicId.uid,
                    'public_id' : checkPublicId.publicId,
                    'fname': checkPublicId.ufirst_name,
                    'lname': checkPublicId.ulast_name
                    }), 200

@app.route("/api/create-game", methods=['POST'])
@token_required
def createGame(current_user):
    if request.method == 'POST':        
        body = request.get_json()
        name = body['name']
        dm_uid = current_user.publicId
        # dm_uid =publicId body['dm_uid']
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

        return jsonify("Success"), 201

@app.route("/api/getgames", methods=['GET'])
@token_required
def getGames(current_user):
    if request.method == 'GET':        
        # body = request.get_json()        
        allCamapaign = campaignModel.query.filter_by(dm_uid=current_user.publicId).all()
        result = []
        for row in allCamapaign:
            # storeAllCampaign.append(row) 
            etr = {}
            etr['cmid'] = row.cmid
            etr['cname'] = row.cname
            etr['cdescription'] = row.cdescription
            etr['password'] = row.password
            etr['capacity'] = row.ccapacity
            # etr['start_date'] = row[5]
            # etr['dm_uid'] = row[6]
            # etr['date_updated'] = row[7]
            # etr['looking_for'] = row[8]
            result.append(etr)

        return jsonify({'status': "Success",
                        'games' : result}), 201
    
@app.route("/api/delete-game", methods=['POST'])
@token_required
def deleteGame(current_user):
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

@app.route("/api/create-room", methods=['POST'])
@token_required
def createRoom(current_user):
    if request.method == 'POST':        
        body = request.get_json()
        gen_room = 0
        
        while(True):
            digits = set(range(10))
            first = random.randint(1, 9)
            last_3 = random.sample(digits - {first}, 3)
            gen_room = int(str(first) + ''.join(map(str, last_3)))
            checkRoom = roomModel.query.filter_by(room=gen_room).first()
            if not checkRoom:
                new_room = roomModel(room= gen_room, isActive= True, rpassword= body['rpassword'], publicId= current_user.publicId, cmid= body['cmid'], online_users=1)
                db.session.add(new_room)
                db.session.commit()
                return jsonify({
                'status':"Success",
                'room' : gen_room,
                'password' : body['rpassword']
                }), 201 

       

@app.route("/api/delete-room", methods=['DELETE'])
@token_required
def deleteRoom(current_user):
    if request.method == 'DELETE':        
        # body = request.get_json()
        deleteRoom = roomModel.query.filter_by(publicId= current_user.publicId).all()
        # deleteRoom = roomModel.query.filter_by(room= body['room']).first()
        if deleteRoom:
            for row in deleteRoom:
                db.session.delete(row)
                db.session.commit()
            return jsonify("Success"), 201

        else:
            return jsonify({'error' : "Room does not exist"}), 404


@app.route("/api/join-room", methods=['PUT'])
@token_required
def joinRoom(current_user):
    if request.method == 'PUT':        
        body = request.get_json()
        getRoom = roomModel.query.filter_by(room= body['room']).first()
        if getRoom:
            if getRoom.rpassword == body['password']:
                getRoom.online_users = getRoom.online_users+1
                db.session.commit()
                return jsonify({
                    'status': "Success",
                    'room' : body['room'],
                    'password' : body['password'],
                    }), 201 
            else:
                return jsonify({'error': "Incorrect room or password"}), 404

        else:
            return jsonify({'error':"Room does not exist"}), 404

@app.route("/api/leave-room", methods=['PUT'])
@token_required
def leaveRoom(current_user):
    if request.method == 'PUT':        
        body = request.get_json()
        getRoom = roomModel.query.filter_by(room= body['room']).first()
        if getRoom:
            if getRoom.rpassword == body['code']:
                if getRoom.publicId ==current_user.publicId:
                    return jsonify({
                        'status' : "Host is leaving",
                        'room' : body['room'],
                        'password' : body['code'],
                        'online_users' : getRoom.online_users,
                        'message' : " has closed the room."
                    }), 200
                if getRoom.online_users > 1:
                    getRoom.online_users = getRoom.online_users-1 
                    db.session.commit()
                    return jsonify({
                        'status': "Success",
                        'room' : body['room'],
                        'password' : body['code'],
                        'online_users' : getRoom.online_users,
                        'message' : " has left the room."
                        }), 201 
                else:
                    return jsonify({
                        'status' : "Room is empty",
                        'room' : body['room'],
                        'password' : body['code'],
                        'online_users' : getRoom.online_users,
                        'message' : " has closed the room."
                    }), 200
            else:
                return jsonify({'error': "Incorrect room or password"}), 400

        else:
            return jsonify({'error':"Room does not exist"}), 400


@app.route("/api/check-room", methods=['PUT'])
@token_required
def checkRoom(current_user):
    if request.method == 'PUT':        
        body = request.get_json()
        getRoom = roomModel.query.filter_by(room= body['room']).first()
        if getRoom:
            return jsonify({
                        'status': "Success",
                        'room' : body['room'],
                        'password' : body['code'],
                        'online_users' : getRoom.online_users,
                        }), 200
        else:
            return jsonify({
                'error': "Room does not exist"
            }), 400


#sockets
@socketio.on('join')
@cross_origin()
def on_join(data):
    # print(data)
    username = data['name']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
@cross_origin()
def on_leave(data):
    username = data['name']
    room = data['room']
    leave_room(room)
    send(username + data['message'], to=room)

@socketio.on('close')
@cross_origin()
def on_leave(data):
    room = data['room']
    send('Close Room.', to=room)
    close_room(room)

@socketio.on('message')
@cross_origin()
def handle_message(data):
    room=data['room']
    username = data['name']
    send(username+": " + data['message'], to=room)
    
@app.route("/api/hello")
@token_required
def hello(current_user):
    return jsonify("tokenized!"), 201   



if __name__ == '__main__':
    # socketio.run(app)
    app.run()

