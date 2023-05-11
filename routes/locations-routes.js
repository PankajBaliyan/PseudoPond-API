const express = require('express');
const router = express.Router();

const location_controller = require('../controllers/locations-controllers');

router.get('/locations', location_controller.getAllLocations);
router.get('/locations/:id', location_controller.getLocationById);
router.post('/locations/create/:id', location_controller.createLocations);
router.put('/locations/:id', location_controller.location_update_put);
router.delete('/locations/:id', location_controller.location_delete_delete);

module.exports = router;
