const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory-controllers');

// Create a new inventory item
router.post('/inventory/create/:id', inventoryController.createInventoryItem);

// Get all inventory items
router.get('/inventory', inventoryController.getAllInventoryItems);

// Get a single inventory item by id
router.get('/inventory/:id', inventoryController.getInventoryItemById);

// Update an existing inventory item by id
router.put('/inventory/:id', inventoryController.updateInventoryItemById);

// Delete an existing inventory item by id
router.delete('/inventory/:id', inventoryController.deleteInventoryItemById);

module.exports = router;
