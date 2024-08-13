const Note = require('../models/Note.js')

const asyncHandler = require('express-async-handler')

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean()

    if (!notes?.length)
    {
        return res.status(400).json({ "message": "No notes found" })
    }

    res.json(notes)
})

const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    if (!user || !title || !text)
    {
        return res.status(400).json({ "message": "All fields are required" })
    }

    const duplicate = await Note.findOne({ title }).lean().exec()
    if (duplicate)
    {
        return res.status(409).json({ "message": "That note already exists" })
    }

    const note = await Note.create({ user, title, text })
    if (note)
    {
        return res.status(201).json({ "message": "Note successfully created" })
    }
    else
    {
        return res.status(400).json({ "message": "Note creating failed" })
    }
})

const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    if (!id || !user || !title || !text || typeof completed !== 'boolean')
    {
        return res.status(400).json({ "message": "Incorrect data were sent" })
    }

    const note = await Note.findById(id).exec()
    if (!note)
    {
        return res.status(400).json({ "message": "That note does not exist" })
    }

    const duplicate = await Note.findOne({ title }).exec()
    if (duplicate && duplicate?._id.toString() !== id)
    {
        return res.status(409).json({  "message": "Duplicate note" })
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json({ "message": `Note ${updatedNote.title} updated` })
})

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id)
    {
        return res.status(400).json({ "message": "Note id is required" })
    }

    const note = await Note.findById(id).exec()
    
    if (!note)
    {
        return res.status(400).json({ "message": "That note does not exist" })
    }

    const result = await note.deleteOne()

    res.json({ "message": `Note ${note.title} with id: ${note._id} was deleted` })
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}