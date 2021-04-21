const express = require('express');
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

app.get('/api/notes', (req,res) => res.json(notesData));

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));