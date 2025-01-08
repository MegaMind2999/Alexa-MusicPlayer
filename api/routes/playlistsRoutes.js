const express = require('express')
const router = express.Router()
const { createplaylist, deletePlaylist,insertInto, getAll, deleteSongFromPlaylist ,updatePlaylist } = require('../controllers/playlistControllers');

router.route('/create')
            .post(createplaylist)
router.route('/delete')
            .post(deletePlaylist)
router.route('/insert')
            .post(insertInto)
router.route('/getall')
            .get(getAll)
router.route('/deletesong')
            .post(deleteSongFromPlaylist)
router.route('/update')
            .post(updatePlaylist)
            


module.exports = router