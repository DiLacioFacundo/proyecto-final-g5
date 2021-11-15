// archivo /api/note.js

const express= require('express');
const router = express.Router();
const Note = require('../models/Note');


// router.route('/api/notes');
// router.route('/api/notes/:id');

router
  // Buscar todas las notas
  .route('/api/notes')
  .get((req, res) => {
    Note.find((err, notes) => {
      res.json(notes);
    })
  })
    // Crear nota usando los datos req.body
  .post((req, res)=> {
    const note = new Note({
      title: req.body.title,
      text: req.body.text
    });
    note.save((err,note) => {
      res.json(note);
    })
});

router
  .route('/api/notes/:id')
  .get((req, res) => {
    Note.find({ id: req.params.id}, (err,note)=>{
      res.json(note);
    })
  })
  .put((req, res) => {
    res.send('Actualizar nota')
  })
  .delete((req, res) => {
    Note.findByIdAndRemove(req.params.id, (err) => {
      res.json({ msg: 'Nota borrada'});
    })
  });


module.exports = router;
