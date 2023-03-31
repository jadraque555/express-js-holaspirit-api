var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.isLoggedIn == true || req.session.auth) {
    res.redirect('/users')
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
