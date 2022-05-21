const express = require('express')

// Create an API route for /notes
const apiRouterNotes = require('./apiRouterNotes.js')
const app = express();

app.use('/notes', apiRouterNotes)

module.export = app;