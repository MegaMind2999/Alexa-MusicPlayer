const express = require('express')
const authControllers = require('../controllers/authControllers')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()
const uploads = require('../middleware/multer(img)')


router.route('/login')
            .get()
            .post(authControllers.login)

router.route('/testToken')
            .get(verifyToken,authControllers.testvalidation)
            .post()

router.route('/signup')
            .get()
            .post(uploads.single('profileimg'),authControllers.signup)



module.exports = router