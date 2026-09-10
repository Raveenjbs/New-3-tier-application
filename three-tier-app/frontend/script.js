function getProductIcon(name) {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("laptop")) return "💻";
    if (lowerName.includes("keyboard")) return "⌨️";
    if (lowerName.includes("mouse")) return "🖱️";
    if (lowerName.includes("watch")) return "⌚";
    if (lowerName.includes("phone")) return "📱";
    if (lowerName.includes("headphone")) return "🎧";

    return "🛍️";
}


async function loadProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "Loading products...";

    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        productList.innerHTML = "";

        products.forEach(product => {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `
                <div class="product-image">
                    ${getProductIcon(product.name)}
                </div>

                <div class="product-content">
                    <h3>${product.name}</h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <span class="product-price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <button class="buy-button"
                        onclick="alert('${product.name} added to cart')">
                        Add to Cart
                    </button>
                </div>
            `;

            productList.appendChild(card);
        });

    } catch (error) {
        productList.innerHTML =
            "Unable to load products. Please try again.";
    }
}


document
    .getElementById("product-form")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const description =
            document.getElementById("description").value;

        const price =
            document.getElementById("price").value;

        const message =
            document.getElementById("message");

        try {

            const response = await fetch("/api/products", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: parseFloat(price)
                })
            });

            const result = await response.json();

            message.innerText =
                result.message || result.error;

            if (response.ok) {
                document
                    .getElementById("product-form")
                    .reset();

                loadProducts();
            }

        } catch (error) {
            message.innerText =
                "Unable to communicate with backend.";
        }
    });


loadProducts();
