// packages and dependencies
const express = require('express');
const notesRouter = require('express').Router()
const path = require('path')
const fs = require('fs')

// Helper for generating unique IDs
const uuid = require('../helpers/uuid');

//Setting up the express middleware
notesRouter.use(express.json());
notesRouter.use(express.urlencoded({ extended: true }));

// GET route to read json file and return all saved notes as json
notesRouter.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        err ? console.log(err) : res.json(JSON.parse(data))
    });
});

// POST route, receive a new note to save on the request body
notesRouter.post('/', (req, res) => {

    // Destructuring the notes in req.body
    const { title, text } = req.body;

    // if every required properties are present,
    // then variable for the object will be saved
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        const parsedNotes = JSON.parse(data)
        parsedNotes.push(newNote);

        // Write to ile
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), 'utf8', (err) => {
            err ? console.log(err) : console.log('Update note page success!')
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(400).json('Update notes error!')
    }
});

// DELETE requests
// notesRouter.delete('/api/notes/:id', (req, res) => {

// })

module.exports = notesRouter;