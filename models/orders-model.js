const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    orderItems: {
        type: Array,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order