const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song' // This references the Song model
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);