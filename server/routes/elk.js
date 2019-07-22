const express = require('express');
const router = express.Router();
const Staff  = require('../models/staff');
const Movie  = require('../models/movie');

router.get('/staffs', (req, res) => {
  Staff.search(
    {query_string: {query: req.query.q}},
    {hydrate: true},
    function(err, results) {
    if(!err)res.status(200).json(results.hits.hits);
    else res.status(400).json(err);
  });
});

router.get('/movies', (req, res) => {
  Movie.search(
    {query_string: {query: req.query.q}},
    {hydrate: true},
    function(err, results) {
      if(!err)res.status(200).json(results.hits.hits);
      else res.status(400).json(err);
    });
});

module.exports = router;