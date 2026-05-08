from App import app

client = app.test_client()


# =========================
# GET /products
# =========================
def test_get_products():
    response = client.get("/products")
    assert response.status_code == 200


# =========================
# GET /cart
# =========================
def test_get_cart():
    response = client.get("/cart")
    assert response.status_code == 200


# =========================
# POST /cart (agregar producto válido)
# =========================
def test_add_to_cart_success():
    response = client.post("/cart", json={
        "productId": 1
    })

    assert response.status_code == 201


# =========================
# POST /cart (error: sin productId)
# =========================
def test_add_to_cart_missing_data():
    response = client.post("/cart", json={})

    assert response.status_code == 400


# =========================
# POST /cart (error: producto inexistente)
# =========================
def test_add_to_cart_invalid_product():
    response = client.post("/cart", json={
        "productId": 999
    })

    assert response.status_code == 404


# =========================
# DELETE /cart/<id>
# =========================
def test_delete_from_cart():
    # Primero agregamos un producto para asegurarnos que existe
    client.post("/cart", json={"productId": 1})

    response = client.delete("/cart/1")

    assert response.status_code in [200, 404]


# =========================
# GET /cart/total
# =========================
def test_cart_total():
    response = client.get("/cart/total")
    assert response.status_code == 200