var express = require('express');
var router = express.Router();
var Student 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('management/index', { title: 'Student Management' });
});

module.exports = router;
