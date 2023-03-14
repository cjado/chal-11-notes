const router = require('express').Router()
const db = require('../../db/db.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    try {
        let currentNotes = db;
        res.status(200).json(currentNotes)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/notes', async (req, res) => {
    console.log(req.body)
    try {
        req.body.id = uuidv4();
        const { title, text, id } = req.body;
        if (title && text) {
            const newNote = {
                title,
                text,
                id
            };

            fs.readFile('./db/db.json', "utf8", (err, data) => {
                if (err) {
                    console.log(err)
                }
                let noteData = JSON.parse(data)
                noteData.push(newNote)
                fs.writeFile('./db/db.json', JSON.stringify(noteData), (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(data)
                });
            })
            res.status(200).json();
        }
            }
            // await fs.promises.writeFile('./db/db.json', JSON.stringify(notes));
            catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
    }

);

router.delete('/:id', async (req, res) => {
    try {
        const result = db.filter((note) => note.id === req.params.id)[0];
        const index = db.findIndex(note => note.id === result.id);
        db.splice(index, 1);
        await fs.promises.writeFile('./db/db.json', JSON.stringify(notes));
        console.info(`${req.method} request received to delete item`);
        res.send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router