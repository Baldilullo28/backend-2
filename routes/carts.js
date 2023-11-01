const express = require('express');
const router = express.Router();
const fs = require('fs');


router.use((req, res, next) => {
    try {
        
        const cartsData = fs.readFileSync('data/carrito.json', 'utf-8');
        carts = JSON.parse(cartsData);
    } catch (error) {
        carts = [];
    }
    next();
});

router.post('/', (req, res) => {
    const newCart = req.body;
    newCart.id = generateCartId(); 
    carts.push(newCart);
    persistCarts(); 
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find((c) => c.id === cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
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
        res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
});

module.exports = router;
