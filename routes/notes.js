const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route to retrieve all notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    );

// POST Route for submitting new notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    console.log(req.body);

    // If all the required properties are present
    if(title && text) {
        const newNote = {
            title,
            text,
        };

    readAndAppend(newNote, './db/db.json');

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