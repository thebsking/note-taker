//set dependencies
const { static } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const notesDb = './db/db.json'

//app setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'))

//html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')))

//api routes
app.get('/api/notes', (req, res) => {
    
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.appendFile(notesDb, newNote)
})

//start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));