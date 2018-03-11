var express = require('express');
var router = express.Router();
var Student = require('../models/student');

/* GET home page. */
router.get('/', function(req, res, next) {
  var students = Student.find();
  res.render('management/index', { title: 'Student Management', students: students });
});

// Save a video
router.post('/student', function(req, res) {
  console.log('Post a student');
  const newStudent = new Student();
  newStudent.name = req.body.title,
  newStudent.description = req.body.description,

  newStudent.save(function(err, insertedStudent) {
      if(err) {
        console.log('Error saving video');
      } else {
        res.json(insertedVideo);
      }
  });
});

module.exports = router;
