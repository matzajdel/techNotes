const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT.js')

router.route('/')
    .get(verifyJWT, usersController.getAllUsers)
    .post(verifyJWT, usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)
    .delete(verifyJWT, usersController.deleteUser)

module.exports = router