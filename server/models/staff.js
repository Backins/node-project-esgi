const db = require('../lib/db');
const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  firstname:{
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  nationality: String,
  biography: String,
  birthday: Date,
  createdAt: Date,
});

StaffSchema.pre('save', function (next) {
  console.log('Saving ...' + this.title);
  next();
});
StaffSchema.post('save', function (doc) {
  console.log(doc.title + ' is saved');
});

module.exports = db.model('Staff', StaffSchema); // movies