<<<<<<< HEAD
from extension import db
=======
from api.extension import db
>>>>>>> 0ba4bf422bfb94a9baa5e0ed3940120b20373c9d
 
class characterModel(db.Model):
    __tablename__ = 'character'
 
    cid = db.Column(db.Integer, primary_key = True)
    campaign_cmid = db.Column(db.Integer)
    user_uid = db.Column(db.Integer)
    cs_csid = db.Column(db.Integer)
 
    def __init__(self, campaign_cmid, user_uid, cs_csid):
        self.campaign_cmid = campaign_cmid
        self.user_uid = user_uid
        self.cs_csid = cs_csid 

    def __repr__(self):
        return f'Character("{self.campaign_cmid}","{self.user_uid}","{self.cs_csid}")'
    
    # def serialize(self):
    #     return {
    #         'cs_path': self.cs_path,
    #         'name': self.name
    #     }