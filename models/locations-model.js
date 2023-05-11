const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationId: { type: Number, required: true },
    locationName: { type: String, required: true },
    locationDescription: { type: String, required: true },
    locationAddress: { type: String, required: true },
    locationLatitude: { type: Number, required: true },
    locationLongitude: { type: Number, required: true },
    locationType: { type: String, enum: ['park', 'museum', 'restaurant'], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', locationSchema);
