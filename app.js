const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

app.use(express.json());

const CartManager = require("./models/cartManager");
const ProductManager = require("./models/productManager");

const cartManager = new CartManager();
const productManager = new ProductManager();

// Middleware para cargar datos de carritos y productos
app.use((req, res, next) => {
    try {
        const cartsData = fs.readFileSync("data/carrito.json", "utf-8");
        cartManager.setCarts(JSON.parse(cartsData));
    } catch (error) {
        cartManager.setCarts([]);
    }

    try {
        const productsData = fs.readFileSync("data/productos.json", "utf-8");
        productManager.setProducts(JSON.parse(productsData));
    } catch (error) {
        productManager.setProducts([]);
    }

    next();
});

// Rutas para gestionar carritos
const cartsRouter = require("./routes/carts");
app.use("/api/carts", cartsRouter(cartManager, productManager));

// Rutas para gestionar productos
const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter(productManager));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
