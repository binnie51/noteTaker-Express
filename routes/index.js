const express = require('express')

// Create modular router for API 
const notesRouter = require('./apiRouterNotes');

const app = express();

app.use('/notes', notesRouter)

module.exports = app;