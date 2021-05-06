# Accept current change
from api.extension import db
# from extension import db
 
class roomModel(db.Model):
    __tablename__ = 'rooms'
 
    rid = db.Column(db.Integer, primary_key = True)
    room = db.Column(db.Integer())
    rpassword = db.Column(db.String())
    isActive = db.Column(db.Boolean())
    publicId = db.Column(db.String())
    cmid = db.Column(db.Integer())
    online_users = db.Column(db.Integer())
 
    def __init__(self, room, rpassword, isActive, publicId, cmid, online_users):
        self.room = room
        self.isActive = isActive
        self.rpassword = rpassword
        self.publicId = publicId
        self.cmid = cmid
        self.online_users = online_users


    def __repr__(self):
        return f'Room("{self.room}","{self.isActive}","{self.rpassword}","{self.publicId}", "{self.cmid}", "{self.online_users}")'


    def serialize(self):
        return {
            'room': self.room,
            'isActive': self.isActive,
            'rpassword':self.rpassword,
            'publicId':self.publicId,
            'cmid':self.cmid,
            'online_users':self.online_users
        }
    