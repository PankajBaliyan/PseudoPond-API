const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById } = require('../controllers/events-controllers');

// Create a new event
router.post('/events/create/:id', createEvent);

// Get all events
router.get('/events', getAllEvents);

// Get a single event by id
router.get('/events/:id', getEventById);

// Update an existing event by id
router.put('/events/:id', updateEventById);

// Delete an existing event by id
router.delete('/events/:id', deleteEventById);

module.exports = router;