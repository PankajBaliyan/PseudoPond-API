const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: { type: Number, required: true, unique: true },
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    eventOrganizer: { type: String, required: true },
    eventRegistration: { type: Boolean, required: true },
    eventCapacity: { type: Number, required: true },
    eventAttendees: [{
        attendeeId: { type: String, required: true },
        attendeeName: { type: String, required: true },
        attendeeEmail: { type: String, required: true }
    }],
    eventComments: [{
        commentId: { type: String, required: true },
        commentAuthor: { type: String, required: true },
        commentText: { type: String, required: true },
        commentDate: { type: Date, required: true }
    }],
    eventImage: { type: String, required: true },
    eventVideo: { type: String, required: true },
    createdAt: { type: Date, required: true }
});

module.exports = mongoose.model('Event', eventSchema);