# Accept current change
from api.extension import db
# from extension import db
 
class characterSheetModel(db.Model):
    __tablename__ = 'charactersheet'
 
    cspdfid = db.Column(db.Integer, primary_key = True)
    cs_path = db.Column(db.String())
    name = db.Column(db.String())
    date_created = db.Column(db.Date())
    date_updated = db.Column(db.Date())
 
    def __init__(self, cs_path, name, date_created, date_updated):
        self.cs_path = cs_path
        self.name = name
        self.date_created = date_created
        self.date_updated = date_updated

    def __repr__(self):
        return f'Campaign("{self.cs_path}","{self.name}","{self.date_created}","{self.date_updated}")'
    
    def serialize(self):
        return {
            'cs_path': self.cs_path,
            'name': self.name
        }