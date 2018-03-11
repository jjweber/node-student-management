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
  Student.findByIdAndRemove(studentId)
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
router.post('/update-student/:id', function(req, res, next) {
  var studentId = req.params.id;
  var letterGrade = convertToLetter(req.body.percentage);
  console.log('The student to be removed is: ', studentId);
  Student.findByIdAndUpdate(// the id of the item to find
    req.params.id,

    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body.name,
    req.body.percentage

    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},

    // the callback function
    (err, student) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(student);
    }
)
});




module.exports = router;
