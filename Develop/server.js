const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const notesData = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req,res) => {

    fs.readFile('db/db.json', (err,data) => {
        res.json(JSON.parse(data));
    })

    
});

app.post('/api/notes', (req,res) => {

    console.log(req.body);

    fs.readFile('db/db.json', (err,data) => {
        let notes = JSON.parse(data);
        let len = notes.length -1;
        console.log('notes', notes[len].id);
        let newId=notes[len].id + 1;
        req.body.id = newId;
        notes.push(req.body);


        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.log(err)
            }

            res.json(notes)
        })
       // res.json(JSON.parse(data));
    })

});


app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));