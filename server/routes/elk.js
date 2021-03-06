const express = require('express');
const router = express.Router();
const Staff  = require('../models/staff');
const Movie  = require('../models/movie');
const axios = require('axios');
const mockStaff = require('../mocks');

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

router.get('/population', async (req, res) => {


  await Promise.all([mockStaff.map(staff => new Staff(staff).save())]);

  const staffs = await Staff.find();

  for (let page = 1; page < 15 ; page++) {

    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&&api_key=f1e8fb7a9ad3c8a82af4f5a6fe5f7ddf&page=${page}`)

    const genres = ['Action',
      'Adventure',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Historical',
      'Historical fiction',
      'Horror',
      'Magical realism',
      'Mystery',
      'Paranoid Fiction',
      'Philosophical',
      'Political',
      'Romance',
      'Saga',
      'Satire',
      'Science fiction',
      'Social',
      'Speculative',
      'Thriller',
      'Urban',
      'Western'];

    await Promise.all([ data.results.map(movie => {
      var category = [];
      var actors = [];

      var limit = Math.random() * 3 + 1;
      for (let i = 0; i <   limit ; i++) {
        category = [...category,genres[Math.floor(Math.random() * genres.length - 1) + 0 ]];
      }


      limit = Math.random() * 10 + 1;
      for (let i = 0; i <   limit ; i++) {
        const obj = staffs[Math.floor(Math.random() * staffs.length - 1) + 0 ];
        if(obj) actors = [...actors, obj.toObject()['_id']];
      }


      var realisator = null ;
      while (!realisator){
         const tmp = staffs[Math.floor(Math.random() * staffs.length - 1) + 0 ];
        if(tmp) realisator = tmp.toObject()['_id'];
      }

 
      const dataMovie = {
        title: movie.title,
        posterPath: 'https://image.tmdb.org/t/p/w500_and_h282_face' + movie['poster_path'],
        year: movie['release_date'],
        category,
        actors,
        realisator
      };

      return new Movie(dataMovie).save();
    })])
  }

});

module.exports = router;


