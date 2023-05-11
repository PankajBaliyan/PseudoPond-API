const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    inventoryId: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    }
});

const Inventories = mongoose.model('Inventories', inventoryItemSchema);

module.exports = Inventories;
