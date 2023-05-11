const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products-controllers');

// GET /products
router.get('/products', getProducts);

// GET /products/:id
router.get('/products/:id', getProductById);

// POST /products
router.post('/products/create/:id', createProduct);

// PUT /products/:id
router.put('/products/:id', updateProduct);

// DELETE /products/:id
router.delete('/products/:id', deleteProduct);

module.exports = router;
