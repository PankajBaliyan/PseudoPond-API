const casual = require('casual')
const notifier = require('node-notifier')
const Location = require('../models/locations-model');

//* Get all locations at once
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//* Get location by ID
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (location == null) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//* function to get highest id & will store data after that
async function getNextLocationId() {
    try {
        const maxLocationIdDoc = await Location.find().sort({ locationId: -1 }).limit(1);
        const nextLocationID = maxLocationIdDoc.length > 0 ? maxLocationIdDoc[0].locationId + 1 : 1;
        return nextLocationID;
    } catch (err) {
        console.error('Error getting the next location ID', err);
        return 1
    }
}

//* Create locations n number at single click
exports.createLocations = async (req, res) => {
    const id = req.params.id
    try {
        const locations = [];
        let locationId = await getNextLocationId();
        for (let i = 0; i < id; i++) {
            const locationName = casual.city;
            const locationDescription = casual.sentences(n = 2);
            const locationAddress = casual.address;
            const locationLatitude = casual.latitude;
            const locationLongitude = casual.longitude;
            const locationType = casual.random_element(['park', 'museum', 'restaurant']);

            const location = {
                locationId,
                locationName,
                locationDescription,
                locationAddress,
                locationLatitude,
                locationLongitude,
                locationType,
                createdAt: casual.date('YYYY-MM-DD'),
            };

            locations.push(location);
            locationId = locationId + 1
        }
        locations.sort((a, b) => a.locationId - b.locationId); // Sort the locations array by locationId

        // loop through the array of locations and use the create method to add each location to the database
        try {
            await Location.insertMany(locations);
            console.log('Locations added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Locations Added Successfully!'
            });
            res.send('Locations added successfully to the database')
        } catch (err) {
            console.error('Error adding Locations to the database', err);
            res.send('Error creating Locations DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
};

// Handle location update on PUT.
exports.location_update_put = async (req, res) => {
    // try {
    //     const location = await Location.findById(req.params.id);
    //     if (location == null) {
    //         return res.status(404).json({ message: 'location not found' });
    //     }
    //     if (req.body.customerId != null) {
    //         location.customerId = req.body.customerId;
    //     }
    //     if (req.body.products != null) {
    //         location.products = req.body.products;
    //     }
    //     if (req.body.locationTotal != null) {
    //         location.locationTotal = req.body.locationTotal;
    //     }
    //     if (req.body.locationDate != null) {
    //         location.locationDate = req.body.locationDate;
    //     }
    //     location.updatedAt = new Date();
    //     const updatedLocation = await location.save();
    //     res.json(updatedLocation);
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }
};

// Handle location delete on DELETE.
exports.location_delete_delete = async (req, res) => {
    // try {
    //     const location = await Location.findById(req.params.id);
    //     if (location == null) {
    //         return res.status(404).json({ message: 'location not found' });
    //     }
    //     await location.remove();
    //     res.json({ message: 'location deleted successfully' });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};
