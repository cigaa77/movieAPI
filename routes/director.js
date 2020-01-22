var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// Models
const Director = require('../models/Director');

router.post('/', (req, res) => {
  const director = new Director(req.body);
  director.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/', (req, res) => {
  Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movie'
      }
    },
    {
      $unwind: {
        path: '$movie',
        // Eşleşme olmayan sonucların da dönmesini sağlar
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movie'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }
  ]).then(data => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })

})

router.get('/:director_id', (req, res) => {
  Director.aggregate([
    {
      $match: {
        // ObjectId type olduğu için
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movie'
      }
    },
    {
      $unwind: {
        path: '$movie',
        // Eşleşme olmayan sonucların da dönmesini sağlar
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movie'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }
  ]).then(data => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })
})

router.put('/:director_id', (req, res) => {
  Director.findByIdAndUpdate(req.params.director_id, req.body, { new: true })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.delete('/:director_id', (req, res) => {
  Director.findByIdAndRemove(req.params.director_id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router;
