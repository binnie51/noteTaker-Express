// packages and dependencies
const express = require('express');
const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
// const db = require('../db/db.json');

// Helper for generating unique IDs
const uuid = require('../helpers/uuid');

//Setting up the express middleware
notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));

// GET route to read json file and return all saved notes as json
notes.get('/', (req, res) => {
    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        if (err){
            console.log(err)
        }
        else {
            res.json(JSON.parse(data));
        }
    });
});

// POST route, receive a new note to save on the request body
notes.post('/', (req, res) => {

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
        
        // convert str into JSON object
        // db.push(newNote);
        // const parsedNotes = JSON.parse(db)
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);


        // Write to ile
        fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes), (err) =>
            err
                ? console.error(err)
                : console.log('Successfully updated reviews!')
        );
            
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

module.exports = notes;