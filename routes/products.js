const express = require('express');
const router = express.Router();
const ProductManager = require('../models/productManager');

const productManager = new ProductManager();

router.post('/', (req, res) => {
    const newProduct = req.body;
    const addedProduct = productManager.addProduct(newProduct);
    if (addedProduct) {
        res.status(201).json(addedProduct);
    } else {
        res.status(400).json({ error: 'No se pudo agregar el producto' });
    }
});

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.put('/:productId', (req, res) => {
    const { productId } = req.params;
    const updatedProduct = req.body;
    const updatedProductResult = productManager.updateProduct(productId, updatedProduct);
    if (updatedProductResult) {
        res.json(updatedProductResult);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    const deletedProduct = productManager.deleteProduct(productId);
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;
