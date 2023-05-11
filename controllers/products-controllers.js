const casual = require('casual');
const notifier = require('node-notifier')
const Product = require('../models/products-model');

//* function to get highest id & will store data after that
async function getNextProductId() {
    try {
        const maxProductIdDoc = await Product.find().sort({ productId: -1 }).limit(1);
        const nextProductID = maxProductIdDoc.length > 0 ? maxProductIdDoc[0].productId + 1 : 1;
        return nextProductID;
    } catch (err) {
        console.error('Error getting the next product ID', err);
        return 1
    }
}

//* route to create fake date at single click
const createProduct = async (req, res) => {
    const id = req.params.id
    try {
        const products = [];
        let productId = await getNextProductId();
        for (let i = 0; i < id; i++) {

            const product = {
                productId,
                productName: casual.word,
                productDescription: casual.sentences(n = 3),
                productPrice: casual.double(from = 1, to = 1000).toFixed(2),
                productImage: `https://source.unsplash.com/300x300/?${productId}`,
                productCategory: casual.random_element(['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys']),
                productStock: casual.integer(from = 1, to = 1000),
                productInStock: casual.random_element([true, false]),
                productRating: casual.double(from = 1, to = 5).toFixed(2),
                productReviews: casual.integer(from = 0, to = 1000),
                createdAt: new Date()
            };

            products.push(product);
            productId = productId + 1
        }
        products.sort((a, b) => a.productId - b.productId); // Sort the products array by productId

        // loop through the array of products and use the create method to add each product to the database
        try {
            await Product.insertMany(products);
            console.log('Products added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Products Added Successfully!'
            });
            res.send('Products added successfully to the database')
        } catch (err) {
            console.error('Error adding Products to the database', err);
            res.send('Error creating Products DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
};

//* Get all Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//* Get Product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//* Update Product
const updateProduct = async (req, res) => {
    // try {
    //     const {
    //         productName,
    //         productDescription,
    //         productPrice,
    //         productImageUrl,
    //         productCategory
    //     } = req.body;

    //     const product = await Product.findById(req.params.id);

    //     if (!product) {
    //         return res.status(404).json({ message: 'Product not found' });
    //     }

    //     product.productName = productName;
    //     product.productDescription = productDescription;
    //     product.productPrice = productPrice;
    //     product.productImageUrl = productImageUrl;
    //     product.productCategory = productCategory;

    //     await product.save();

    //     res.json(product);
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
};

//* Delete Product
const deleteProduct = async (req, res) => {
    // try {
    //     const product = await Product.findById(req.params.id);

    //     if (!product) {
    //         return res.status(404).json({ message: 'Product not found' });
    //     }

    //     await product.remove();

    //     res.json({ message: 'Product deleted successfully' });
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
