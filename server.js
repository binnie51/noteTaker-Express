// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4} = require('uuid');
const database = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route to read json file and return all saved notes as json
app.get('/api/notes', (req, res) => res.json(database));

// GET wildcard, fallback route for when a user attempts to visit routes that don't exist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// POST route, receive a new note to save on the request body
app.post('/api/notes', (req, res) => {
  // Destructuring the notes in req.body
  const { title, text } = req.body;

  // if every required properties are present,
  // then variable for the object will be saved
  if (title && text) {
      const newNote = {
          title,
          text,
          id: uuidv4(),
      };
      
      // convert str into JSON object
      database.push(newNote);

      // Write to ile
      fs.writeFile(`./db/db.json`, JSON.stringify(database), (err) =>
          err
              ? console.error(err)
              : console.log('Successfully updated reviews!')
      );
          
      const response = {
          status: 'success',
          body: newNote,
      };

      console.log(response);
      res.json(response);
  } else {
      res.status(400).json('Update notes error!')
  }
});

// Listen for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
