// packages and dependencies
const express = require('express');
const notesRoute = require('express').Router()
const path = require('path')
const fs = require('fs')

// GET route to read json file and return all saved notes as json
notesRoute.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        err ? console.log(err) : res.json(JSON.parse(data))
    });
});

module.exports = notesRoute