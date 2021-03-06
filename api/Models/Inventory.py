from api.extension import db
# from extension import db
 
class inventoryModel(db.Model):
    __tablename__ = 'inventory'
 
    iid = db.Column(db.Integer, primary_key = True)
    character_cid = db.Column(db.Integer)
    item_itid = db.Column(db.Integer)
 
    def __init__(self, character_cid, item_itid):
        self.character_cid = character_cid
        self.item_itid = item_itid

    def __repr__(self):
        return f'Inventory("{self.character_cid}","{self.item_itid}")'
    
    def serialize(self):
        return {
            'character_cid': self.character_cid,
            'item_itid': self.item_itid
        }