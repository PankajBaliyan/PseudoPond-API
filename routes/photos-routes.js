const express = require('express')
const router = express.Router()
const { getAllPhotos, createFakePhotos } = require('../controllers/photos-controllers');

router.get('/photos', getAllPhotos)

router.get('/photos/create/:id', createFakePhotos)

module.exports = router