var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'directors'
      }
    },
    {
      $unwind: {
        path: '$directors',
        preserveNullAndEmptyArrays: true
      }
    }
  ])
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
      res.json({
        status: 1
      })
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

router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  Movie.find({
    year: { '$gte': parseInt(start_year), '$lte': parseInt(end_year) }
  })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router;
