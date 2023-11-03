const express = require('express');
const router = express.Router();
const CartManager = require('../models/cartManager');

const cartManager = new CartManager();

router.post('/', (req, res) => {
    const newCart = req.body;
    const addedCart = cartManager.addCart(newCart);
    if (addedCart) {
        res.status(201).json(addedCart);
    } else {
        res.status(400).json({ error: 'No se pudo crear el carrito' });
    }
});

router.post('/:cartId/product/:productId', (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    const addedProduct = cartManager.addProductToCart(cartId, productId, quantity);
    if (addedProduct) {
        res.status(201).json(addedProduct);
    } else {
        res.status(404).json({ error: 'No se pudo agregar el producto al carrito' });
    }
});

router.get('/:cartId', (req, res) => {
    const { cartId } = req.params;
    const cart = cartManager.getCart(cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.delete('/:cartId', (req, res) => {
    const { cartId } = req.params;
    const deletedCart = cartManager.deleteCart(cartId);
    if (deletedCart) {
        res.json(deletedCart);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

module.exports = router;
