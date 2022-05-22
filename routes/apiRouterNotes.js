// packages and dependencies
const express = require('express');
const notesRouter = require('express').Router()
const path = require('path')
const fs = require('fs')

// Helper for generating unique IDs
const uuid = require('./helpers/uuid');

// GET route to read json file and return all saved notes as json
notesRouter.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        err ? console.log(err) : res.json(JSON.parse(data))
    });
});

// POST route, receive a new note to save on the request body
notesRouter.post('/api/notes', (req, res) => {

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

        fs.writeFile('/db/db.json', JSON.stringify(notesRouter), 'utf8', (err, data) => {
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

// DELETE 
notesRouter.delete('api/notes/:id')

module.exports = notesRouter;