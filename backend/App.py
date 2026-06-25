from flask import Flask
from flasgger import Swagger
from flask_cors import CORS

from database import db

from models.product import Product
from models.cart import CartItem

from routes.routes import routes_bp

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///store.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

CORS(app)

Swagger(app)

app.register_blueprint(routes_bp)

with app.app_context():

    db.create_all()

    if Product.query.count() == 0:

        products = [

            Product(
                name="Sandalias",
                price=1200,
                url="https://i.pinimg.com/originals/90/e2/5d/90e25d2940aca40b9eabb63ea9b3a4a5.jpg"
            ),

            Product(
                name="Zapatos",
                price=1500,
                url="https://dcuero.com.ec/wp-content/uploads/2022/01/Dcuero5-21.jpg"
            ),

            Product(
                name="Botas",
                price=1800,
                url="https://images.tcdn.com.br/img/img_prod/1252071/bota_feminina_cano_longo_alto_salto_bloco_grosso_confortavel_ibr4_preto_919_1_ee763944f7a04acabd5f99bb45328277.jpg"
            ),

            Product(
                name="Zapatillas",
                price=2000,
                url="https://tse4.mm.bing.net/th/id/OIP.IwONblvk_Z9GSn2iqO6qxAHaFe?pid=Api&P=0&h=180"
            ),

            Product(
                name="Mocasines",
                price=1700,
                url="https://beluar.co/wp-content/uploads/2025/01/mocasines-en-cuero-negro-para-mujer-beluar.jpg"
            ),

            Product(
                name="Alpargatas",
                price=1100,
                url="https://www.escapeshoes.com/wp-content/uploads/2018/11/alpargatas-paez-classic-surfy-argentina-azul.jpg"
            )
        ]

        db.session.add_all(products)

        db.session.commit()

@app.route("/")
def home():
    return "Servidor funcionando"

if __name__ == "__main__":
    app.run(debug=True)