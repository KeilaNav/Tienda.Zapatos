# TP Final - SPA Backend (Flask)

## 📌 Descripción
Este proyecto es una API REST desarrollada con Flask que simula un sistema de carrito de compras tipo Coffee Cart, pero de una tienda de Zapatos.

---

## ⚙️ Tecnologías utilizadas
- Python 3
- Flask
- Pytest
- Swagger (Flasgger)

---

## 🚀 Cómo ejecutar el proyecto

1. Instalar dependencias:
```bash
pip install flask flasgger pytest

2. Ejecutar el servidor: 
    python App.py

3. Abrir el navegador:
    http://127.0.0.1:5000


📡 Funcionalidades (Endpoints)
📦 Productos
GET /products → Lista todos los productos
🛒 Carrito
GET /cart → Muestra el carrito
POST /cart → Agrega un producto al carrito
DELETE /cart/<id> → Elimina un producto del carrito
GET /cart/total → Calcula el total de la compra



Documentación de la API
Swagger permite probar la API desde el navegador:
http://127.0.0.1:5000/apidocs/



Tests
Para ejecutar los tests automatizados:
python -m pytest
Los tests validan:
Funcionamiento de endpoints
Agregado y eliminación de productos
Cálculo del total del carrito
Respuestas correctas de la API