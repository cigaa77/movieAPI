var express = require('express');
var router = express.Router();

var bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  bcryptjs.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });
    user.save().then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
  })
});

router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    username
  }, (err, user) => {
    if (err)
      throw err;
    if (!user) {
      res.json({
        status: false,
        message: 'Authentication failed, user not found.'
      })
    } else {
      bcryptjs.compare(password, user.password).then(result => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authentication failed, wrong password.'
          })
        } else {
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 saat ( 720 dk )
          });
          res.json({
            status: true,
            token
          });
        }
      })
    }
  })
});

module.exports = router;
