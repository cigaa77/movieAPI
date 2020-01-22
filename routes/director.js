var express = require('express');
var router = express.Router();

// Models
const Director=require('../models/Director');

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

module.exports = router;
