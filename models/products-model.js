const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productInStock: {
        type: Boolean,
        required: true
    },
    productStock: {
        type: Number,
        required: true
    },
    productRating: {
        type: Number,
        required: true
    },
    productReviews: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product