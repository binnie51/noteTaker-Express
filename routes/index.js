const express = require('express')

// 
const apiRouterNotes = require('./apiRouterNotes.js')
const app = express();

app.use('/notes', apiRouterNotes)

module.export = app;