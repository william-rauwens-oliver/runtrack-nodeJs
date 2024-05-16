const readline = require('readline');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});

const Student = mongoose.model('Student', studentSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Entrer le nom de famille : ', (lastname) => {
  Student.find({ lastname })
    .then((students) => {
      console.log(students);
      rl.close();
    })
    .catch((err) => {
      console.error(err);
      rl.close();
    });
});
