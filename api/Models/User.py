from extension import db
  
class userModel(db.Model):
    __tablename__ = 'users'
 
    uid = db.Column(db.Integer, primary_key = True)
    publicId = db.Column(db.String())
    ufirst_name = db.Column(db.String())
    ulast_name = db.Column(db.String())
    uemail = db.Column(db.String())
    upassword = db.Column(db.String())
    uusername = db.Column(db.String())

 
    def __init__(self, publicId, ufirst_name, ulast_name, uemail, upassword, uusername):
        self.publicId = publicId
        self.ufirst_name = ufirst_name
        self.ulast_name = ulast_name
        self.uemail = uemail
        self.upassword = upassword
        self.uusername = uusername
 
    def __repr__(self):
        return f'User("{self.publicId}","{self.ufirst_name}","{self.last_name}", "{self.uemail}", "{self.uusername}")'