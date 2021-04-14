//set dependencies
const { static } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { dirname } = require('path');
const notesDbPath = './db/db.json'

//app setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'))

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

// app.get('/api/notes/:id', (req, res) => {
//     fs.readFile(notesDbPath, 'utf8', (err, data) => {
//         if (err) throw err;
        
//         const id = req.params.id;
//         const note = JSON.parse(data);
//         let index;
//         for (obj of note) {
//             if(obj.id === id) {
//                 index = note.indexOf(obj)
//             }
//         }
//         res.json(note[index])
//     });
// });

app.post('/api/notes', (req, res) => {
    
    fs.readFile(notesDbPath, 'utf8', (err, data) => {
        if (err) throw err;
        let notesDbContent = JSON.parse(data);

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Math.random().toString(36).substr(8),
            //random string generator found on stackOverflow
        }
        notesDbContent.push(newNote);
        //console.log(notesDbContent);
        fs.writeFile(notesDbPath, JSON.stringify(notesDbContent), 'utf8', (err, data) => {
            if (err) throw (err);
            res.json(JSON.stringify(data))
        })
    })
});



// app.delete('/api/notes/:id', (req, res) => {
//     fs.readFile(notesDbPath, 'utf8', (err, data) => {
//         if (err) throw err;
//         let notesDbContent = JSON.parse(data);
//         const updatedDb = notesDbContent.splice(req.params.id, 1);

//         fs.writeFile(notesDbPath, JSON.stringify(updatedDb), 'utf8', (err) => {
//             if (err) throw (err);
//         })
//     })
// })

//start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));