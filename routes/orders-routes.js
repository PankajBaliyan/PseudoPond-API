const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders-controllers');

// GET all orders
router.get('/orders', ordersController.getAllOrders);

// GET a specific order by ID
router.get('/orders/:id', ordersController.getOrderById);

// POST a new order
router.post('/orders/create/:id', ordersController.createOrder);

// PUT update an order by ID
router.put('/orders/:id', ordersController.updateOrderById);

// DELETE an order by ID
router.delete('/orders/:id', ordersController.deleteOrderById);

module.exports = router;
