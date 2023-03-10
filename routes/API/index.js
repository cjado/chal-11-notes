const router = require("express").Router();
const notes = require('../../data/db.json');
const fs = require('fs');
const {v4: uuidv4 } = require('uuid');
router.get("/notes", (req,res) =>{
    let results = notes;
    console.info(`${req.method} request recieved to get reviews`);
    res.json(results);
});
router.post("/notes", (req,res) =>{
    req.body.id = uuidv4();
    const { title , text , id} = req.body;
    if(title && text){
        const newNote = {
            title,
            text,
            id
        };
        notes.push(newNote);
    }
     fs.writeFile(
        './data/db.json',
        JSON.stringify(notes),
        (err) =>
            err ? console.error(err) : console.info('Successfully updated notes!')
    );
    res.json(notes);
})
router.delete("/notes/:id",(req,res)=>{
    const result = notes.filter((note) => note.id === req.params.id)[0];
    let index = notes.findIndex( note => note.id === result.id);
    notes.splice(index,1);
    fs.writeFile(
        './data/db.json',
        JSON.stringify(notes),
        (err) =>
            err ? console.error(err) : console.info('Successfully updated notes!')
    );
    console.info(`${req.method} request recieved to delete item`);
    return res.send();
})
module.exports = router;