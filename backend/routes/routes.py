from flask import Blueprint, jsonify, request
from models.product import Product
from models.cart import CartItem
from database import db

routes_bp = Blueprint("routes_bp", __name__)

# Endpoint para obtener productos
@routes_bp.route("/products", methods=["GET"])
def get_products():
    
    """
    Obtener lista de productos
    ---
    tags:
    - Productos

    responses:
    200:
        description: Lista de productos obtenida correctamente
    """
    
    products = Product.query.all()

    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "url": p.url
        }
        for p in products
    ])

# Ver carrito
@routes_bp.route("/cart", methods=["GET"])
def get_cart():
    
    """
    Obtener productos del carrito
    ---
    tags:
    - Carrito

    responses:
    200:
        description: Lista de productos del carrito
    """

    cart_items = CartItem.query.all()

    return jsonify([
        {
            "id": item.product_id,
            "name": item.name,
            "price": item.price,
            "url": item.url,
            "quantity": item.quantity
        }
        for item in cart_items
    ])


# Eliminar producto del carrito
@routes_bp.route("/cart/<int:product_id>", methods=["DELETE"])
def remove_from_cart(product_id):
    
    """
    Eliminar producto del carrito
    ---
    tags:
    - Carrito

    parameters:
    - name: product_id
        in: path
        type: integer
        required: true
        description: ID del producto a eliminar

    responses:
    200:
        description: Producto eliminado correctamente

    404:
        description: Producto no encontrado en el carrito
    """

    cart_item = CartItem.query.filter_by(
        product_id=product_id
    ).first()

    if not cart_item:
        return jsonify({
            "error": "Producto no encontrado"
        }), 404

    if cart_item.quantity > 1:

        cart_item.quantity -= 1

    else:

        db.session.delete(cart_item)

    db.session.commit()

    return jsonify({
        "message": "Producto eliminado"
    })

# Endpoint para agregar productos al carrito
@routes_bp.route("/cart", methods=["POST"])
def add_to_cart():
    
    """
    Agregar producto al carrito
    ---
    tags:
    - Carrito

    parameters:
    - in: body
        name: body
        required: true
        schema:
        type: object
        properties:
            productId:
            type: integer

    responses:
    201:
        description: Producto agregado correctamente

    404:
        description: Producto no encontrado

    400:
        description: Datos inválidos
    """


    data = request.get_json()

    if not data or "productId" not in data:
        return jsonify({
            "error": "Debe enviar productId"
        }), 400

    product_id = data.get("productId")

    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "error": "Producto no encontrado"
        }), 404

    cart_item = CartItem.query.filter_by(
        product_id=product_id
    ).first()

    if cart_item:

        cart_item.quantity += 1

    else:

        cart_item = CartItem(
            product_id=product.id,
            name=product.name,
            price=product.price,
            url=product.url,
            quantity=1
        )

        db.session.add(cart_item)

    db.session.commit()

    return jsonify({
        "message": "Producto agregado al carrito"
    }), 201

    
# Calcular total
@routes_bp.route("/cart/total", methods=["GET"])
def calculate_total():
    
    """
    Calcular total del carrito
    ---
    tags:
    - Carrito

    responses:
    200:
        description: Total calculado correctamente
    """


    cart_items = CartItem.query.all()

    total = sum(
        item.price * item.quantity
        for item in cart_items
    )

    return jsonify({
        "total": total
    })