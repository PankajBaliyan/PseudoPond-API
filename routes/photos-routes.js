const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photos-controllers');

// GET /photos
router.get('/photos', photoController.getAllPhotos);

// GET /photos/:id
router.get('/photos/:id', photoController.getPhotoById);

// POST /photos
router.post('/photos/create/:id', photoController.createPhoto);

// PUT /photos/:id
router.put('/photos/:id', photoController.updatePhoto);

// DELETE /photos/:id
router.delete('/photos/:id', photoController.deletePhoto);

module.exports = router;
