const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/')
    .get(loginLimiter, authController.login)

router.route('/refresh')
    .post(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router