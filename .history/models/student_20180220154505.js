var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    studentName: {type: String, required: true},
    studentPercent: {type: Number, required: true},
    studentLetterGrade: {th}
});

module.exports = mongoose.model('Student', schema);