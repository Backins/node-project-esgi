const db = require('../lib/db');
const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const MovieSchema = new mongoose.Schema({
  title: String,
  createdAt: Date,
  posterPath: String,
  year: {
    type: String,
    min: 1896
  },
  category: {
    type: Array,
  },
  //actors: [{
    //staff: {
      //type: mongoose.Schema.Types.ObjectId,
      //ref: 'Staff'
    //}
  //}],
  actors: [String],
  realisator: {
    //type: mongoose.Schema.Types.ObjectId,
    //ref: 'Staff'
    type: String
  }
});

MovieSchema.index({ title: 'text', createdAt: 'text', year: 'text', category: 'text', realisator: 'text' });

MovieSchema.pre('save', function (next) {
  console.log('Saving ...' + this.title);
  this.createdAt = Date.now();
  next();
});
MovieSchema.post('save', function (doc) {
  console.log(doc.title + ' is saved');
});

MovieSchema.plugin(mongoosastic);

MovieSchema.plugin(mongoosastic, {
  "host": "elasticsearch",
  "port": 9200
});


module.exports = db.model('Movie', MovieSchema); // movies