//set dependencies
const { static } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const notesDbPath = './db/db.json'

//app setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./public'))

//html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')))

let notesDbContent = [];
fs.readFile(notesDbPath, 'utf8', (err, data)=>{
    if(err) throw err;
    notesDbContent.push(data);
    console.log(notesDbContent);
});

//api routes
app.get('/api/notes', (req, res) => {
    fs.readFile(notesDbPath, 'utf8', (err, data)=>{
        if (err) throw err;
        res.json(JSON.parse(data))
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    notesDbContent.push(newNote);
    // console.log(newNote);
    fs.writeFile(notesDbPath, JSON.stringify(notesDbContent), 'utf8', (err) => {
        if (err) throw (err);
    })
})

//start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));