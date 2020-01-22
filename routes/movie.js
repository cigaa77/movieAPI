var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  Movie.find({})
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/', function (req, res) {
  const movie = new Movie(req.body);
  movie.save()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
});

router.get('/id/:movie_id', (req, res) => {
  Movie.findById(req.params.movie_id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    })
})

router.put('/id/:movie_id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.delete('/id/:movie_id', (req, res) => {
  Movie.findByIdAndRemove(req.params.movie_id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/top10', (req, res) => {
  Movie.find({})
    .limit(10)
    .sort({ imdb_score: -1 })
    .then((data) => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router;
