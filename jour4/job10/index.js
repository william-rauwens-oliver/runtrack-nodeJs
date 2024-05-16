const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme')
  .then(() => console.log('Connection to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  students_number: { type: Number, required: true },
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'year', required: true }
});

const Student = mongoose.model('Student', studentSchema, 'student');
