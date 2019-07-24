const express = require('express');
const router = express.Router();
const Movie  = require('../models/movie');

router.get('/', (req, res) => {
  Movie.find().limit(10).then(data => res.json(data));
});


module.exports = router;