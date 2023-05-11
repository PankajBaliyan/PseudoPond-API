const casual = require('casual');
const notifier = require('node-notifier')
const Order = require('../models/orders-model');

//* Get all Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a specific order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//* function to get highest id & will store data after that
async function getNextOrderId() {
    try {
        const maxOrderIdDoc = await Order.find().sort({ orderId: -1 }).limit(1);
        const nextOrderID = maxOrderIdDoc.length > 0 ? maxOrderIdDoc[0].orderId + 1 : 1;
        return nextOrderID;
    } catch (err) {
        console.error('Error getting the next order ID', err);
        return 1
    }
}

//* route to create fake date at single click
exports.createOrder = async (req, res) => {
    const id = req.params.id
    try {
        const orders = [];
        let orderId = await getNextOrderId();
        for (let i = 0; i < id; i++) {
            const orderItems = [
                { productId: casual.uuid, productName: casual.word, quantity: casual.integer(from = 1, to = 10), price: casual.double(from = 1, to = 1000).toFixed(2) },
                { productId: casual.uuid, productName: casual.word, quantity: casual.integer(from = 1, to = 10), price: casual.double(from = 1, to = 1000).toFixed(2) },
                { productId: casual.uuid, productName: casual.word, quantity: casual.integer(from = 1, to = 10), price: casual.double(from = 1, to = 1000).toFixed(2) }
            ];
            const order = {
                orderId,
                orderDate: casual.date('YYYY-MM-DD'),
                customerId: casual.uuid,
                orderItems: orderItems,
                productId: casual.uuid,
                productName: casual.word,
                quantity: casual.integer(from = 1, to = 10),
                price: casual.double(from = 1, to = 1000).toFixed(2),
                totalPrice: orderItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
                shippingAddress: casual.address,
                paymentMethod: casual.random_element(['Credit Card', 'PayPal', 'Cash on Delivery']),
                status: casual.random_element(['Processing', 'Shipped', 'Delivered']),
                createdAt: casual.date('YYYY-MM-DD'),
            };
            console.log("order", order)

            orders.push(order);
            orderId = orderId + 1
        }
        orders.sort((a, b) => a.orderId - b.orderId); // Sort the orders array by orderId

        // loop through the array of orders and use the create method to add each order to the database
        try {
            await Order.insertMany(orders);
            console.log('Orders added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Orders Added Successfully!'
            });
            res.send('Orders added successfully to the database')
        } catch (err) {
            console.error('Error adding Orders to the database', err);
            res.send('Error creating Orders DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
};

// PUT update an order by ID
exports.updateOrderById = async (req, res) => {
    // try {
    //     const order = await Order.findById(req.params.id);
    //     if (order == null) {
    //         return res.status(404).json({ message: 'Order not found' });
    //     }
    //     if (req.body.customerId != null) {
    //         order.customerId = req.body.customerId;
    //     }
    //     if (req.body.products != null) {
    //         order.products = req.body.products;
    //     }
    //     if (req.body.orderTotal != null) {
    //         order.orderTotal = req.body.orderTotal;
    //     }
    //     if (req.body.orderDate != null) {
    //         order.orderDate = req.body.orderDate;
    //     }
    //     order.updatedAt = new Date();
    //     const updatedOrder = await order.save();
    //     res.json(updatedOrder);
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }
};

// DELETE an order by ID
exports.deleteOrderById = async (req, res) => {
    // try {
    //     const order = await Order.findById(req.params.id);
    //     if (order == null) {
    //         return res.status(404).json({ message: 'Order not found' });
    //     }
    //     await order.remove();
    //     res.json({ message: 'Order deleted successfully' });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};
