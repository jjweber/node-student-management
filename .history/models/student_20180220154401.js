var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    studentName: {type: String, req},
    studentPercent: {},
    studentLetterGrade: {}
});

module.exports = mongoose.model('Student', schema);