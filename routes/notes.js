const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs = require('fs');

// GET Route to retrieve all notes

notes.get('/', function(req, res) {
    // read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;

      // parse the data and return all saved notes
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });

// POST Route for submitting new notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    // If all the required properties are present
    if(title && text) {
        const newNote = {
            title,
            text,
        };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedData = JSON.parse(data);
          parsedData.push(newNote);

          fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) =>
            err ? console.error(err) : console.info(`\nData written to db.json`)
          );    
        }
      });


    const response = {
        status: 'Success',
        body: newNote,
    };

    res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});


module.exports = notes;