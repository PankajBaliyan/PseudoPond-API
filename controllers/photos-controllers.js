const notifier = require('node-notifier'),
    casual = require('casual'),
    photosModel = require('../models/photos-model')

const getAllPhotos = async (req, res) => {
    try {
        const response = await photosModel.find({})
        res.json(response)
    } catch (error) {
        console.log("Error which fetching photos from DataBase", error)
        res.send("error ", error)
    }
}

//* function to get highest id & will store data after that
async function getNextPhotoId() {
    try {
        const maxPhotoIdDoc = await photosModel.find().sort({ photoId: -1 }).limit(1);
        const nextPhotoID = maxPhotoIdDoc.length > 0 ? maxPhotoIdDoc[0].photoId + 1 : 1;
        return nextPhotoID;
    } catch (err) {
        console.error('Error getting the next photo ID', err);
        return 1
    }
}

const createFakePhotos = async (req, res) => {
    const id = req.params.id
    try {
        const photos = [];
        let photoId = await getNextPhotoId();
        for (let i = 0; i < id; i++) {
            const photoTitle = casual.title;
            const photoUrl = `https://picsum.photos/id/${photoId}/800/600`;
            const photoThumbnailUrl = `https://picsum.photos/id/${photoId}/200/150`;

            const photo = {
                photoId: photoId,
                photoTitle: photoTitle,
                photoUrl: photoUrl,
                photoThumbnailUrl: photoThumbnailUrl,
                createdAt: new Date(),
            };

            photos.push(photo);
            photoId = photoId + 1
        }
        photos.sort((a, b) => a.photoId - b.photoId); // Sort the photos array by photoId

        // loop through the array of photos and use the create method to add each photo to the database
        try {
            await photosModel.insertMany(photos);
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
}

module.exports = {
    getAllPhotos,
    createFakePhotos
}