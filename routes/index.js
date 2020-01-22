var express = require('express');
var router = express.Router();

// Models
const User = require('../models/User')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
  const { username, password } = req.body;
  const user = new User({
    username,
    password
  });
  user.save().then(data => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })
});

module.exports = router;
