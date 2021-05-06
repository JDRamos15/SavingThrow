# Accept current change
from api.extension import db
# from extension import db

  
class itemModel(db.Model):
    __tablename__ = 'Item'
 
    itid = db.Column(db.Integer, primary_key = True)
    item_name = db.Column(db.String())
    item_effect = db.Column(db.String())
    item_description = db.Column(db.String())
    item_damage = db.Column(db.Integer)

 
    def __init__(self, item_name, item_effect, item_description, item_damage):
        self.item_name = item_name
        self.item_effect = item_effect
        self.item_description = item_description
        self.item_damage - item_damage
    
    
    def serialize(self):
        return{
            'itid': self.itid,
            'name' : self.item_name,
            'effect' : self.item_effect,
            'description' : self.item_description,
            'damage' : self.item_damage
        }

 
    def __repr__(self):
        return f'Item("{self.item_name}","{self.item_effect}", "{self.item_description}", "{self.item_damage}")'