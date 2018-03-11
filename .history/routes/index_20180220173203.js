var express = require('express');
var router = express.Router();
var Student = require('../models/student');

/* GET home page. */
router.get('/', function(req, res, next) {
  Student.find(function(err, docs) {
    console.log(docs);
    res.render('management/index', { title: 'Student Management', students: docs });
  });
});

/* Get all products */
router.get('/', function(req, res, next) {
  console.log('Get request for all of the products in db');
  Product.find({})
  .exec(function(err, products) {
      if(err) {
      console.log('Error retrieving products');
      } else {
      res.json(products);
      }
  });

});

/* GET create page. */
router.get('/create', function(req, res, next) {
  Student.find(function(err, docs) {
    res.render('management/create', { title: 'Create Student' });
  });
});

/* GET edit page. */
router.get('/edit', function(req, res, next) {
  Student.find(function(err, docs) {
    res.render('management/edit', { title: 'Edit Student' });
  });
});

/* GET read page. */
router.get('/read', function(req, res, next) {
  Student.find(function(err, docs) {
    res.render('management/read', { title: 'Read Student' });
  });
});

/* GET delete page. */
router.get('/delete', function(req, res, next) {
  Student.find(function(err, docs) {
    res.render('management/delete', { title: 'Delete Student' });
  });
});

// Save a video
router.post('/student-save', function(req, res) {
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
        console.log('Error saving student');
      } else {
        res.json(insertedStudent);
      }
  });
});

module.exports = router;
