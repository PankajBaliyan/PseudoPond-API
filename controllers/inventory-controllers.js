const casual = require('casual');
const notifier = require('node-notifier')
const InventoryItem = require('../models/inventory-model');

// Middleware function to get highest id & return it
async function getNextInventoryId() {
    try {
        const maxInventoryIdDoc = await InventoryItem.find().sort({ inventoryId: -1 }).limit(1);
        const nextInventoryID = maxInventoryIdDoc.length > 0 ? maxInventoryIdDoc[0].inventoryId + 1 : 1;
        return nextInventoryID;
    } catch (err) {
        console.error('Error getting the next inventoryId', err);
        return 1
    }
}

exports.createInventoryItem = async (req, res) => {
    const id = req.params.id
    try {
        const inventories = [];
        let inventoryId = await getNextInventoryId();
        for (let i = 0; i < id; i++) {

            const inventoryItem = {
                inventoryId,
                productName: casual.word,
                productId: casual.uuid,
                productDescription: casual.sentence,
                productImage: `https://source.unsplash.com/300x300/?${inventoryId}`,
                productPrice: casual.integer(10, 100),
                productQuantity: casual.integer(1, 100),
                productCategory: casual.random_element(['Electronics', 'Clothing', 'Home & Garden', 'Sports']),
                createdAt: casual.date('YYYY-MM-DD'),
            };
            inventories.push(inventoryItem);
            inventoryId = inventoryId + 1
        }
        inventories.sort((a, b) => a.inventoryId - b.inventoryId); // Sort the inventories array by inventoryId

        // loop through the array of inventories and use the create method to add each employee to the database
        try {
            await InventoryItem.insertMany(inventories);
            console.log('Inventories added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Inventories Added Successfully!'
            });
            res.send('Inventories added successfully to the database')
        } catch (err) {
            console.error('Error adding Inventories to the database', err);
            res.send('Error creating Inventories DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
};

// GET all inventory items
exports.getAllInventoryItems = async (req, res) => {
    try {
        const inventoryItems = await InventoryItem.find();
        res.status(200).json(inventoryItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET a single inventory item by ID
exports.getInventoryItemById = async (req, res) => {
    let inventory;
    try {
        inventory = await InventoryItem.findById(req.params.id);
        if (inventory == null) {
            return res.status(404).json({ message: 'Cannot find inventory' });
        }
        res.status(200).json(inventory);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.updateInventoryItemById = async (req, res) => {
    // try {
    //     const inventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //     if (!inventoryItem) throw new Error('Inventory item not found');
    //     res.status(200).json({ message: 'Inventory item updated successfully', inventoryItem });
    // } catch (error) {
    //     res.status(404).json({ error: error.message });
    // }
};

exports.deleteInventoryItemById = async (req, res) => {
    // try {
    //     const inventoryItem = await InventoryItem.findByIdAndDelete(req.params.id);
    //     if (!inventoryItem) throw new Error('Inventory item not found');
    //     res.status(200).json({ message: 'Inventory item deleted successfully', inventoryItem });
    // } catch (error) {
    //     res.status(404).json({ error: error.message });
    // }
};
