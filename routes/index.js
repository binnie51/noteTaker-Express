const express = require('express')

// Create modular router for API 
const apiRouterNotes = require('./apiRouterNotes.js')
const app = express();

app.use('/notes', apiRouterNotes)

module.exports = app;