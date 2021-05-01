# Accept current change
# from api.extension import db
from extension import db
 
class roomModel(db.Model):
    __tablename__ = 'rooms'
 
    rid = db.Column(db.Integer, primary_key = True)
    room = db.Column(db.Integer())
    rpassword = db.Column(db.String())
    isActive = db.Column(db.Boolean())
    publicId = db.Column(db.String())
    cmid = db.Column(db.Integer())
 
    def __init__(self, room, rpassword, isActive, publicId, cmid):
        self.room = room
        self.isActive = isActive
        self.rpassword = rpassword
        self.publicId = publicId
        self.cmid = cmid


    def __repr__(self):
        return f'Room("{self.room}","{self.isActive}","{self.rpassword}","{self.publicId}", "{self.cmid}")'
    