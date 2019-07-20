const db = require('../lib/db');
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  createdAt: Date,
  year: {
    type: Number,
    min: 1896
  },
  category: {
    type: String,
    enum: ['Drama', 'SF', 'Comedy', 'Action']
  },
  staffs: [{
    role: String,
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff'
    }
  }]
});

MovieSchema.pre('save', function (next) {
  console.log('Saving ...' + this.title);
  this.createdAt = Date.now();
  next();
});
MovieSchema.post('save', function (doc) {
  console.log(doc.title + ' is saved');
});

module.exports = db.model('Movie', MovieSchema); // movies