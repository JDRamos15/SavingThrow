from Models.User import userModel
from extensions import db
from flask import Flask, request, jsonify, make_response


@user.route("/create", methods=['GET','POST'])
def createUser():
    if request.method == 'GET':
        return make_response(jsonify("Login via the login Form"))
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
    
            return make_response(jsonify("Success"),status=201)
    
            
        return make_response(jsonify("Email or Username already is use"), status=404)