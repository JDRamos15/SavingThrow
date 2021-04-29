# Accept current change
# from api.extension import db
from extension import db
 
class campaignModel(db.Model):
    __tablename__ = 'campaign'
 
    cmid = db.Column(db.Integer, primary_key = True)
    cname = db.Column(db.String())
    dm_uid = db.Column(db.Integer())
    cdescription = db.Column(db.String())
    start_date = db.Column(db.String())
    looking_for = db.Column(db.Boolean())
    date_updated = db.Column(db.Date())
    password = db.Column(db.String())
    ccapacity = db.Column(db.Integer())

 
    def __init__(self, cname, dm_uid, cdescription, start_date, looking_for, date_updated, password, ccapacity):
        self.cname = cname
        self.dm_uid = dm_uid
        self.cdescription = cdescription
        self.start_date = start_date
        self.looking_for = looking_for
        self.date_updated = date_updated
        self.password = password
        self.ccapacity = ccapacity


    def __repr__(self):
        return f'Campaign("{self.cname}","{self.dm_uid}","{self.cdescription}","{self.looking_for}","{self.start_date}","{self.date_updated}", "{self.password}", "{self.ccapacity}")'
    
    def serialize(self):
        return {
            'name': self.cname,
            'author': self.author,
            'published':self.published
        }