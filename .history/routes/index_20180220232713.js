var express = require('express');
var router = express.Router();
var Student = require('../models/student');



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


/* GET home page.
router.get('/', function(req, res, next) {
  Student.find(function(err, docs) {
    console.log(docs);
    res.render('management/index', { title: 'Student Management', students: docs });
  });
});
 */
/* Get all products */
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

/* GET create page. */
router.get('/create', function(req, res, next) {
  Student.find(function(err, docs) {
    res.render('management/create', { title: 'Create Student' });
  });
});

/* GET edit page. */
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

/* GET read page. */
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

/* GET delete page. */
router.get('/delete/:id', function(req, res, next) {
  var studentId = req.params.id;
  console.log('The student to be removed is: ', studentId);
  Student.delete(studentId)
  .exec(function(err, student) {
      if(err) {
      console.log('Error removing the student');
      } else {
        res.json(student);
      }
      console.log(student);
  });
});

/* POST save student route. */
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
        res.json(insertedStudent);
      }
  });
});

/* GET update student route. */
router.put('/student-update/:id', function(req, res, next) {
  var studentId = req.params.id;
  console.log('The students id is: ', studentId);
  Student.findOne(studentId)
  .exec(function(err, student) {
      if(err) {
      console.log('Error retrieving the student');
      res.status(500).send();
      } else {
        if(!student) {
          res.status(404).send();
        } else {
          if(req.body.name) {
            student.studentName = req.body.name;
          }

          if(req.body.percentage) {
            student.studentPercent = req.body.percentage;
            var letterGrade = convertToLetter(req.body.percentage);
            student.st
          }
        }

  
      }
      console.log(student);
  });


});


router.put('/student-update/:id', function(req, res, next) {
  var studentId = req.params.id;

  Student.findById(studentId, function(error, student) {
    // Handle the error using the Express error middleware
    if(error) return next(error);

    // Render not found error
    if(!student) {
      return res.status(404).json({
        message: 'Course with id ' + id + ' can not be found.'
      });
    }

    // Update the course model
    student.update(student, function(error, student) {
      if(error) return next(error);

      res.json(student);
    });
  });
});

module.exports = router;
