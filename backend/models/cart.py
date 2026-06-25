from database import db

class CartItem(db.Model):

    __tablename__ = "cart"

    id = db.Column(db.Integer, primary_key=True)

    product_id = db.Column(db.Integer, nullable=False)

    name = db.Column(db.String(100), nullable=False)

    price = db.Column(db.Float, nullable=False)

    url = db.Column(db.String(500), nullable=False)

    quantity = db.Column(db.Integer, default=1)