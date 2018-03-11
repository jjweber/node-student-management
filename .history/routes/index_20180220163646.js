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

  var getTotal = null;
  var outputLetterGrade = null;

  function convertToLetter(getTotal) {
      if(getTotal >= 90) {
        outputLetterGrade = 'A';
      }
      else if(getTotal >= 80) {
        outputLetterGrade = 'B';
      }
      else if(getTotal >= 70) {
        outputLetterGrade = 'C';
      }
      else if(getTotal >= 60) {
        outputLetterGrade = 'D';
      } else {
        outputLetterGrade = 'F';
      }

      return outputLetterGrade;
  }

  var letterGrade = convertToLetter(req.body.percentage);

  const newStudent = new Student();
  newStudent.studentName = req.body.name,
  newStudent.studentPercent = req.body.percentage,
  newStudent.studentLetterGrade = letterGrade,
  newStudent.save(function(err, insertedStudent) {
      if(err) {
        console.log('Error saving stud');
      } else {
        res.json(insertedStudent);
      }
  });
});

module.exports = router;
