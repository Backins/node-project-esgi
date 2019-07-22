const db = require('../lib/db');
const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

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

StaffSchema.plugin(mongoosastic);

StaffSchema.plugin(mongoosastic, {
  "host": "elasticsearch",
  "port": 9200
});

module.exports = db.model('Staff', StaffSchema); // movies