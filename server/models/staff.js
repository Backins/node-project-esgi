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

StaffSchema.index({ firstname: 'text', lastname: 'text', biography: 'text', nationality: 'text', birthday: 'text' });

StaffSchema.pre('save', function (next) {
  console.log('Saving ...' + this.firstname);
  this.createdAt = Date.now();
  next();
});

module.exports = db.model('Staff', StaffSchema); // movies