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

module.exports = router;
