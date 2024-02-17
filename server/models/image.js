// /server/models/image.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Image', ImageSchema);
