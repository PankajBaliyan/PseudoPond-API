const notifier = require('node-notifier'),
    casual = require('casual'),
    Photo = require('../models/photos-model')


// Get all photos
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single photo by ID
exports.getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.json(photo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//* function to get highest id & will store data after that
async function getNextPhotoId() {
    try {
        const maxPhotoIdDoc = await Photo.find().sort({ photoId: -1 }).limit(1);
        const nextPhotoID = maxPhotoIdDoc.length > 0 ? maxPhotoIdDoc[0].photoId + 1 : 1;
        return nextPhotoID;
    } catch (err) {
        console.error('Error getting the next photo ID', err);
        return 1
    }
}

// Create a new photo
exports.createPhoto = async (req, res) => {
    const id = req.params.id
    try {
        const photos = [];
        let photoId = await getNextPhotoId();
        for (let i = 0; i < id; i++) {
            const photoTitle = casual.title;
            const photoDescription = casual.sentences(2);
            const photoUrl = `https://picsum.photos/id/${photoId}/800/600`;
            const photoThumbnailUrl = `https://picsum.photos/id/${photoId}/200/150`;
            const photoAlbumId = casual.uuid;
            const photoDate = casual.date('YYYY-MM-DD');
            const photoAuthor = casual.full_name;
            const photoLikes = casual.integer(1, 100);
            const photoComments = casual.integer(1, 50);
            const createdAt = casual.date('YYYY-MM-DDTHH:mm:ssZ');


            const photo = {
                photoId,
                photoTitle,
                photoDescription,
                photoUrl,
                photoThumbnailUrl,
                photoAlbumId,
                photoDate,
                photoAuthor,
                photoLikes,
                photoComments,
                createdAt,
            };

            photos.push(photo);
            photoId = photoId + 1
        }
        photos.sort((a, b) => a.photoId - b.photoId); // Sort the photos array by photoId

        // loop through the array of photos and use the create method to add each photo to the database
        try {
            await Photo.insertMany(photos);
            console.log('Photos added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Photos Added Successfully!'
            });
            res.send('Photos added successfully to the database')
        } catch (err) {
            console.error('Error adding Photos to the database', err);
            res.send('Error creating Photos DataBase')
        }
    } catch (error) {
        console.log("Error which creating photos from DataBase", error)
        res.send("error ", error)
    }
};

// Update a photo by ID
exports.updatePhoto = async (req, res) => {
    // const { photoTitle, photoDescription, photoUrl, photoThumbnailUrl, photoAlbumId, photoDate, photoAuthor, photoLikes, photoComments } = req.body;

    // try {
    //     const photo = await Photo.findById(req.params.id);
    //     if (!photo) {
    //         return res.status(404).json({ message: 'Photo not found' });
    //     }

    //     photo.photoTitle = photoTitle;
    //     photo.photoDescription = photoDescription;
    //     photo.photoUrl = photoUrl;
    //     photo.photoThumbnailUrl = photoThumbnailUrl;
    //     photo.photoAlbumId = photoAlbumId;
    //     photo.photoDate = photoDate;
    //     photo.photoAuthor = photoAuthor;
    //     photo.photoLikes = photoLikes;
    //     photo.photoComments = photoComments;
    //     photo.updatedAt = casual.date('YYYY-MM-DD');

    //     const updatedPhoto = await photo.save();
    //     res.json(updatedPhoto);
    // } catch (err) {
    //     res.status(400).json({ message: err.message });
    // }
};

// Delete a photo by ID
exports.deletePhoto = async (req, res) => {
    // try {
    //     const photo = await Photo.findById(req.params.id);
    //     if (!photo) {
    //         return res.status(404).json({ message: 'Photo not found' });
    //     }

    //     await photo.remove();
    //     res.json({ message: 'Photo deleted successfully' });
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
};
