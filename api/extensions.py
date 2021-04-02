from flask_sqlalchemy import SQLAlchemy

database = SQLAlchemy()

def getDB():
    return database