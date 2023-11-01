const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

app.use(express.json());

let carts = [];

const cartsRouter = require("./routes/carts");
app.use("/api/carts", cartsRouter);

function generateCartId() {
    const timestamp = new Date().getTime().toString(36);
    const randomNumber = Math.random().toString(36).substr(2, 5);
    return timestamp + randomNumber;
}

function persistCarts() {
    const data = JSON.stringify(carts, null, 2);
    fs.writeFileSync("data/carrito.json", data);
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
