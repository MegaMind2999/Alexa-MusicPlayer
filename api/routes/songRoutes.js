const express = require('express')
const router = express.Router()
const uploads_img = require('../middleware/multer(img)')
const uploads_song = require('../middleware/multer(audio)')
const songsControllers = require('../controllers/songsControllers')

router.route('/uploadsong')
            .post(uploads_song,songsControllers.createSong)

router.route('/')
            .get(songsControllers.getAllSongs)

module.exports = router