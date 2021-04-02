from ../.extension import db
 
 
class campaignModel(db.Model):
    __tablename__ = 'campaign'
 
    cmid = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String())
    dm_uid = db.Column(db.Integer())
    description = db.Column(db.String())
    start_date = db.Column(db.String())
    date_created = db.Column(db.String())

 
    def __init__(self, ufirst_name, ulast_name, uemail, upassword):
        self.ufirst_name = ufirst_name
        self.ulast_name = ulast_name
        self.uemail = uemail
        self.upassword = upassword
 
    def __repr__(self):
        return f'User("{self.ufirst_name}","{self.last_name}", "{self.uemail}")'