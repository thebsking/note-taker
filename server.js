//set dependencies
const { static } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const notesDbPath = './db/db.json'

//app setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'))

//html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')))


//api routes
app.get('/api/notes', (req, res) => {
    fs.readFile(notesDbPath, 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    });
});

app.post('/api/notes', (req, res) => {
    
    fs.readFile(notesDbPath, 'utf8', (err, data) => {
        if (err) throw err;
        let notesDbContent = JSON.parse(data);

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Math.random().toString(36).substr(8),//found on stackOverflow
        }
        notesDbContent.push(newNote);
        // console.log(newNote);
        fs.writeFile(notesDbPath, JSON.stringify(notesDbContent), 'utf8', (err) => {
            if (err) throw (err);
        })
    })
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(notesDbPath, 'utf8', (err, data) => {
        if (err) throw err;
        let notesDbContent = JSON.parse(data);

        notesDbContent.splice(req.params.id, 1);

        fs.writeFile(notesDbPath, JSON.stringify(notesDbContent), 'utf8', (err) => {
            if (err) throw (err);
        })
    })
})

//start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));