const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const playlist = require('./playlist')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    profileimg : {
        type : String,
        default: ""
    },

    playlists : [
        {
            type : mongoose.SchemaTypes.ObjectId,
            ref : 'Playlist'
        }
    ],

    followers : [
        {
            type : mongoose.SchemaTypes.ObjectId,
            ref : 'user'
        }
    ],

    following : [
        {
            type : mongoose.SchemaTypes.ObjectId,
            ref : 'user'
        }
    ],

    createdAt : {
        type : Date,
        default : Date.now
    },

    role : {
        type : String,
        enum : ['admin' , 'user'],
        default : 'user'
    },

    token : {
        type : String
    }
})


module.exports = mongoose.model('user' , UserSchema)