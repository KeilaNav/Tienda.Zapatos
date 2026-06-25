# 🛒 TP Final - Tienda Web (Flask + SPA + Testing)

---

## 📌 Descripción

Este proyecto es una aplicación web tipo tienda online con carrito de compras.

Incluye:

- Backend API REST con Flask
- Base de datos SQLite
- Frontend en HTML, CSS y JavaScript
- Tests automatizados (Backend + E2E)

La aplicación permite:
- Visualizar productos
- Agregar productos al carrito
- Eliminar productos del carrito
- Ver el total de la compra
- Persistencia de datos en base de datos

---

## ⚙️ Tecnologías utilizadas

- Python 3
- Flask
- SQLite
- Flasgger (Swagger)
- Pytest
- JavaScript
- HTML / CSS
- Playwright (E2E Testing)

---

# 🚀 Cómo ejecutar el proyecto

## 🔴 1. Iniciar el backend (Flask)

Instalar dependencias:

```bash
pip install flask flasgger pytest flask-cors
Ejecutar servidor:

python App.py

Servidor disponible en:

http://127.0.0.1:5000
🟢 2. Iniciar el frontend

Abrir index.html con Live Server o similar.

Ejemplo:

http://127.0.0.1:5500
🟡 3. Instalar dependencias de testing (solo primera vez)
npm install -D @playwright/test
npx playwright install
📡 Funcionalidades (API Endpoints)
📦 Productos
GET /products → Lista todos los productos
🛒 Carrito
GET /cart → Muestra el carrito
POST /cart → Agrega un producto
DELETE /cart/<id> → Elimina un producto
GET /cart/total → Calcula el total
📘 Documentación API (Swagger)

Se puede probar la API desde el navegador:

http://127.0.0.1:5000/apidocs/
🧪 Testing
✔ Tests de Backend (Pytest)

Para ejecutar tests del backend:

python -m pytest
Validan:
Funcionamiento de endpoints
Agregado de productos al carrito
Eliminación de productos
Cálculo del total
Manejo de errores
✔ Tests E2E (Playwright)

Simulan un usuario real usando la aplicación desde el navegador.

Validan:
Flujo completo de compra
Interacción con la interfaz
Comunicación frontend ↔ backend
Persistencia del carrito
Cálculo del total
▶️ Ejecución de tests
🧪 Ejecutar tests backend
pytest
🧪 Ejecutar tests E2E
npx playwright test
👀 Ejecutar tests en modo visible (recomendado)
npx playwright test --headed

👉 Abre el navegador y muestra el paso a paso de los tests.

📊 Ver reporte de tests
npx playwright show-report

Incluye:

Tests aprobados
Errores (si existen)
Capturas automáticas
Tiempos de ejecución
🧪 Qué validan los tests
✔ Backend
Funcionamiento correcto de la API
Gestión de productos
Gestión del carrito
Cálculo del total
✔ E2E (Frontend + Backend)
Usuario entra a la tienda
Visualiza productos
Agrega productos al carrito
Elimina productos
Ve el total actualizado
Persistencia de datos al recargar
Integración completa frontend ↔ backend