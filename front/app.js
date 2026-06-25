const API = "https://tienda-zapatos-7.onrender.com/";

async function loadProducts() {

    const response = await fetch(`${API}/products`);
    const products = await response.json();

    const container = document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
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
}

async function loadCart() {

    const response = await fetch(`${API}/cart`);
    const cart = await response.json();

    const container = document.getElementById("cart");

    container.innerHTML = "";

    cart.forEach(product => {

        container.innerHTML += `
            <div class="cart-item">

                <span>
                    ${product.name} - x${product.quantity} - $${product.price * product.quantity}
                </span>

                <button
                    class="delete"
                    onclick="removeFromCart(${product.id})">

                    Eliminar

                </button>

            </div>
        `;
    });

    loadTotal();
}

async function addToCart(id){

    await fetch(`${API}/cart`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            productId:id
        })
    });

    loadCart();
}

async function removeFromCart(id){

    await fetch(`${API}/cart/${id}`,{
        method:"DELETE"
    });

    loadCart();
}

async function loadTotal(){

    const response = await fetch(`${API}/cart/total`);
    const data = await response.json();

    document.getElementById("total").textContent =
        `Total: $${data.total}`;
}

loadProducts();
loadCart();