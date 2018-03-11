var express = require('express');
var router = express.Router();
var Student = require('../models/student');

/****************************/
/* Grade Converter Function */
/****************************/
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

/**************************/
/* Get All Students Route */
/**************************/
router.get('/', function(req, res, next) {
  console.log('Get request for all of the students in db');
  Student.find({})
  .exec(function(err, students) {
      if(err) {
      console.log('Error retrieving students');
      } else {
        res.render('management/index', { title: 'Student Management', students: students });
      }
      console.log(students);
  });

});

/*********************/
/* GET Create Route. */
/*********************/
router.get('/create', function(req, res, next) {
  Student.find(function(err, docs) {
    res.render('management/create', { title: 'Create Student' });
  });
});

/*******************/
/* GET Edit Route. */
/*******************/
router.get('/edit/:id', function(req, res, next) {
  var studentId = req.params.id;
  console.log('The students id is: ', studentId);
  Student.findById(studentId)
  .exec(function(err, student) {
      if(err) {
      console.log('Error retrieving the student');
      } else {
        res.render('management/edit', { title: 'Student Management', student: student });
      }
      console.log(student);
  });
});

/*******************/
/* GET Read Route. */
/*******************/
router.get('/read/:id', function(req, res, next) {
  var studentId = req.params.id;
  console.log('The students id is: ', studentId);
  Student.findById(studentId)
  .exec(function(err, student) {
      if(err) {
      console.log('Error retrieving the student');
      } else {
        res.render('management/read', { title: 'Student Management', student: student });
      }
      console.log(student);
  });
});

/*********************/
/* GET Delete Route. */
/*********************/
router.get('/delete/:id', function(req, res, next) {
  alert()
  var studentId = req.params.id;
  console.log('The student to be removed is: ', studentId);
  Student.findByIdAndRemove(studentId)
  .exec(function(err, student) {
      if(err) {
      console.log('Error removing the student');
      } else {
        res.redirect(req.baseUrl + '/');
      }
      console.log(student);
  });
});

/****************************/
/* POST Save Student Route. */
/****************************/
router.post('/student-save', function(req, res) {
  console.log('Post a student');

  var letterGrade = convertToLetter(req.body.percentage);

  const newStudent = new Student();
  newStudent.studentName = req.body.name,
  newStudent.studentPercent = req.body.percentage,
  newStudent.studentLetterGrade = letterGrade,
  newStudent.save(function(err, insertedStudent) {
      if(err) {
        console.log('Error saving student');
      } else {
        res.redirect(req.baseUrl + '/');
      }
  });
});

/******************************/
/* POST Update Student Route. */
/******************************/
router.post('/update-student/:id', function(req, res, next) {
  var studentId = req.params.id;
  var letterGrade = convertToLetter(req.body.percentage);
  console.log('The student to be removed is: ', studentId);
  Student.findById(studentId)
  .exec(function(err, student) {
      if(err) {
        console.log('Error removing the student');
      } else {
        student.studentName = req.body.name;
        student.studentPercent = req.body.percentage;
        student.studentLetterGrade = letterGrade;

        student.save(function(err, updatedStudent) {
          if(err) {
            console.log('Error updating student');
          } else {
            res.redirect(req.baseUrl + '/');
          }
        });
        console.log(req.body.name, req.body.percentage, letterGrade);
      }
      console.log(student);
  });
});




module.exports = router;
