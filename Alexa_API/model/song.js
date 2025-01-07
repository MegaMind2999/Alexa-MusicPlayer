const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    duration: { 
        type: String, 
        required: true 
    },
    audioFile: { 
        type: String, 
        required: true 
    },
    coverImage: { 
        type: String 
    },
    genre: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    lyrics : {
        type : String
    }
});

module.exports = mongoose.model('Song', SongSchema);
