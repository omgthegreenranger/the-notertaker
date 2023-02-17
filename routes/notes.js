const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
            "id": uuidv4(),
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

notes.delete('/:id',function(req, res) {
    const id = req.params.id;
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            jsonRes = JSON.parse(data);
            for (let i = 0; i < jsonRes.length; i++) {
                if (jsonRes[i].id == id) {
                   jsonRes.splice([i],1);
                }
            }
            fs.writeFile('./db/db.json', JSON.stringify(jsonRes), (err) =>
            err ? console.error(err) : console.info(`\nData written to db.json`));
            res.json(jsonRes);
        }})
});

module.exports = notes;