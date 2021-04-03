# UNCOMMENT FOR HEROKU
# from api.extension import db
from extension import db
 
class campaignModel(db.Model):
    __tablename__ = 'campaign'
 
    cmid = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String())
    dm_uid = db.Column(db.Integer())
    description = db.Column(db.String())
    start_date = db.Column(db.String())
    looking_for = db.Column(db.Boolean())
    date_updated = db.Column(db.Date())

 
    def __init__(self, name, dm_uid, description, start_date, looking_for, date_updated):
        self.name = name
        self.dm_uid = dm_uid
        self.description = description
        self.start_date = start_date
        self.looking_for = looking_for
        self.date_updated = date_updated
 
    def __repr__(self):
        return f'Campaign("{self.name}","{self.dm_uid}","{self.description}","{self.looking_for}","{self.start_date}","{self.date_updated}")'