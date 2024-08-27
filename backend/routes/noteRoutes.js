const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT.js')

const { getAllNotes, createNewNote, deleteNote, updateNote } = require('../controllers/notesController.js')

router.route('/')
    .get(verifyJWT, getAllNotes)
    .post(verifyJWT, createNewNote)
    .patch(verifyJWT, updateNote)
    .delete(verifyJWT, deleteNote)

module.exports = router