const express = require('express');
const router = express.Router();
const fs = require('fs');


router.use((req, res, next) => {
    try {
       
        const productsData = fs.readFileSync('data/productos.json', 'utf-8');
        products = JSON.parse(productsData);
    } catch (error) {
        products = [];
    }
    next();
});

router.get('/', (req, res) => {
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = products.find((p) => p.id === pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


router.post('/', (req, res) => {
    const newProduct = req.body;
    newProduct.id = generateProductId(); 
    products.push(newProduct);
    persistProducts(); 
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updatedProduct = req.body;
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        persistProducts(); 
        res.json(products[index]);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const index = products.findIndex((p) => p.id === pid);
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        persistProducts(); 
        res.json(deletedProduct[0]);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;
