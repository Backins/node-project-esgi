const express = require('express');
const router = express.Router();
const Movie  = require('../models/movie');

router.get('/', (req, res) => {
  if(req.query.q){
    req.query.$text = { $search : req.query.q } ;
    delete req.query.q;
  }
  Movie.find(req.query,{ score : { $meta : 'textScore' } }).sort({ score : { $meta : 'textScore' } }).then(data => res.json(data));
});

router.post('/', (req,res) => {
  console.log(req);
  const movie = new Movie(req.body);

  movie.save().then(data => res.status(201).json(data)
    .catch(error => {
      if(error.name === "ValidationError"){
        res.status(400).json(error.errors);
      } else {
        res.sendStatus(500);
      }
    }
  ))
});

router.get('/:id', (req,res) => {
  Movie.findById(req.params.id, function(err, movie) {
  if (err)
      res.send(err);
  res.json(movie);
  });
});

module.exports = router;