const casual = require('casual');
const notifier = require('node-notifier')
const Event = require('../models/events-model');

//* Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({})
        res.json(events)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//* function to get highest id & will store data after that
async function getNextEventId() {
    try {
        const maxEventIdDoc = await Event.find().sort({ eventId: -1 }).limit(1);
        const nextEventID = maxEventIdDoc.length > 0 ? maxEventIdDoc[0].eventId + 1 : 1;
        return nextEventID;
    } catch (err) {
        console.error('Error getting the next event ID', err);
        return 1
    }
}

//* route to create fake date at single click
const createEvent = async (req, res) => {
    const id = req.params.id
    try {
        const events = [];
        let eventId = await getNextEventId();
        for (let i = 0; i < id; i++) {

            const event = {
                eventId,
                eventName: casual.word,
                eventDescription: casual.sentences(n = 3),
                eventDate: casual.date('YYYY-MM-DD'),
                eventLocation: casual.address,
                eventOrganizer: casual.name,
                eventRegistration: casual.boolean,
                eventCapacity: casual.integer(from = 1, to = 1000),
                eventAttendees: [{
                    attendeeId: casual.uuid,
                    attendeeName: casual.name,
                    attendeeEmail: casual.email,
                }],
                eventComments: [{
                    commentId: casual.uuid,
                    commentAuthor: casual.name,
                    commentText: casual.sentences(1),
                    commentDate: casual.date('YYYY-MM-DD'),
                }],

                eventImage: `https://source.unsplash.com/300x300/?${eventId}`,
                eventVideo: `https://www.youtube.com/watch?v=c-IOTSTIXsM`,
                createdAt: casual.date('YYYY-MM-DD'),
            };
            events.push(event);
            eventId = eventId + 1
        }
        events.sort((a, b) => a.eventId - b.eventId); // Sort the events array by eventId

        // loop through the array of events and use the create method to add each event to the database
        try {
            await Event.insertMany(events);
            console.log('Events added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Events Added Successfully!'
            });
            res.send('Events added successfully to the database')
        } catch (err) {
            console.error('Error adding Events to the database', err);
            res.send('Error creating Events DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
}

// Get a single event by id
const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing event by id
const updateEventById = async (req, res) => {
    // const { id } = req.params;
    // const { name, date, location } = req.body;
    // try {
    //     const updatedEvent = await Event.findByIdAndUpdate(
    //         id,
    //         { name, date, location },
    //         { new: true }
    //     );
    //     if (!updatedEvent) {
    //         return res.status(404).json({ message: 'Event not found' });
    //     }
    //     res.status(200).json(updatedEvent);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};

// Delete an existing event by id
const deleteEventById = async (req, res) => {
    // const { id } = req.params;
    // try {
    //     const deletedEvent = await Event.findByIdAndDelete(id);
    //     if (!deletedEvent) {
    //         return res.status(404).json({ message: 'Event not found' });
    //     }
    //     res.status(200).json(deletedEvent);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
};

module.exports = { getAllEvents, createEvent, getEventById, updateEventById, deleteEventById };
