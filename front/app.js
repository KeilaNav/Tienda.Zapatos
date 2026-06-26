const API = "https://tienda-zapatos-7.onrender.com";

async function loadProducts() {
    try {
        const response = await fetch(`${API}/products`);
        if (!response.ok) throw new Error("Error al cargar productos");

        const products = await response.json();
        const container = document.getElementById("products");

        let html = "";

        products.forEach(product => {
            html += `
                <div class="product">
                    <img src="${product.url}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <button onclick="addToCart(${product.id})">
                            Agregar
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

    } catch (error) {
        console.error(error);
        document.getElementById("products").innerHTML =
            "<p>Error al cargar productos</p>";
    }
}

async function loadCart() {
    try {
        const response = await fetch(`${API}/cart`);
        if (!response.ok) throw new Error("Error al cargar carrito");

        const cart = await response.json();
        const container = document.getElementById("cart");

        let html = "";

        cart.forEach(product => {
            html += `
                <div class="cart-item">
                    <span>
                        ${product.name} - x${product.quantity} - $${product.price * product.quantity}
                    </span>
                    <button class="delete" onclick="removeFromCart(${product.id})">
                        Eliminar
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;

        loadTotal();

    } catch (error) {
        console.error(error);
        document.getElementById("cart").innerHTML =
            "<p>Error al cargar carrito</p>";
    }
}

async function addToCart(id) {
    try {
        const response = await fetch(`${API}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: id })
        });

        if (!response.ok) throw new Error("Error al agregar al carrito");

        loadCart();

    } catch (error) {
        console.error(error);
    }
}

async function removeFromCart(id) {
    try {
        const response = await fetch(`${API}/cart/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Error al eliminar");

        loadCart();

    } catch (error) {
        console.error(error);
    }
}

async function loadTotal() {
    try {
        const response = await fetch(`${API}/cart/total`);
        if (!response.ok) throw new Error("Error al obtener total");

        const data = await response.json();

        document.getElementById("total").textContent =
            `Total: $${data.total}`;

    } catch (error) {
        console.error(error);
    }
}

loadProducts();
loadCart();