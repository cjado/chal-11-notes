const router = require('express').Router()
const db = require('../../db/db.json')
const fs = require('fs')
const {v4: uuidv4 } = require('uuid');


router.get('/db', (req,res) => {
    try {
        let currentNotes = db;
        res.status(200).json(currentNotes)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/db', async (req, res) => {
    try {
        req.body.id = uuidv4();
        const { title, text, id } = req.body;
        if (title && text) {
            const newNote = {
                title,
                text,
                id
            };
            notes.push(newNote);
        }
        await fs.promises.writeFile('./db/db.json', JSON.stringify(notes));
        res.status(200).json(db);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/db/:id', (req,res)=>{
});

module.exports = router