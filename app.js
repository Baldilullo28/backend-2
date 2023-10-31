const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

// Middleware para procesar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Definir un array para almacenar productos y carritos
let products = [];
let carts = [];

// Rutas para productos
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
    // Implementa la lógica para listar todos los productos
    res.json(products);
});

productsRouter.get("/:pid", (req, res) => {
    const { pid } = req.params;
    // Implementa la lógica para obtener un producto por su ID
    const product = products.find((p) => p.id === pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

productsRouter.post("/", (req, res) => {
    // Implementa la lógica para crear un nuevo producto
    const newProduct = req.body;
    newProduct.id = generateProductId(); // Genera un nuevo ID
    products.push(newProduct);
    persistProducts();
    res.status(201).json(newProduct);
});

productsRouter.put("/:pid", (req, res) => {
    const { pid } = req.params;
    // Implementa la lógica para actualizar un producto por su ID
    const updatedProduct = req.body;
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        persistProducts();
        res.json(products[index]);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

productsRouter.delete("/:pid", (req, res) => {
    const { pid } = req.params;
    // Implementa la lógica para eliminar un producto por su ID
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        persistProducts();
        res.json(deletedProduct[0]);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

app.use("/api/products", productsRouter);

// Rutas para carritos
const cartsRouter = express.Router();

cartsRouter.post("/", (req, res) => {
    // Implementa la lógica para crear un nuevo carrito
    const newCart = req.body;
    newCart.id = generateCartId(); // Genera un nuevo ID
    carts.push(newCart);
    persistCarts();
    res.status(201).json(newCart);
});

cartsRouter.get("/:cid", (req, res) => {
    const { cid } = req.params;
    // Implementa la lógica para obtener productos de un carrito por su ID
    const cart = carts.find((c) => c.id === cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: "Carrito no encontrado" });
    }
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    // Implementa la lógica para agregar un producto al carrito
    const cart = carts.find((c) => c.id === cid);
    const product = products.find((p) => p.id === pid);
    if (cart && product) {
        const existingProduct = cart.products.find((p) => p.product === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }
        persistCarts();
        res.json(cart.products);
    } else {
        res.status(404).json({ error: "Carrito o producto no encontrado" });
    }
});

app.use("/api/carts", cartsRouter);

// Funciones auxiliares para generar IDs y persistir datos en archivos

function generateProductId() {
    // Implementa la generación de un nuevo ID para productos
    // Asegúrate de que el ID no se duplique
}

function generateCartId() {
    // Implementa la generación de un nuevo ID para carritos
    // Asegúrate de que el ID no se duplique
}

function persistProducts() {
    // Implementa la persistencia de datos de productos en un archivo
    // Utiliza el módulo fs para escribir en un archivo productos.json
}

function persistCarts() {
    // Implementa la persistencia de datos de carritos en un archivo
    // Utiliza el módulo fs para escribir en un archivo carrito.json
}

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
