from flask import Blueprint, jsonify, request
from mocks.store import products, cart

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
    
    return jsonify(products)

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

    return jsonify(cart)

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

    product = next((p for p in cart if p["id"] == product_id), None)

    if not product:
        return jsonify({
            "error": "Producto no encontrado en el carrito"
        }), 404

    cart.remove(product)

    return jsonify({
        "message": "Producto eliminado del carrito",
        "cart": cart
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

      # Validación
    if not data or "productId" not in data:
        return jsonify({
            "error": "Debe enviar productId"
        }), 400

    product_id = data.get("productId")

    # Buscar producto
    product = next((p for p in products if p["id"] == product_id), None)

    # Validar si existe
    if not product:
        return jsonify({
            "error": "Producto no encontrado"
        }), 404

    # Agregar al carrito
    cart.append(product)

    return jsonify({
        "message": "Producto agregado al carrito",
        "cart": cart
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


    total = sum(product["price"] for product in cart)

    return jsonify({
        "total": total
    })