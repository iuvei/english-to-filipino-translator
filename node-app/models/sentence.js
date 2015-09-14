var mongoose = require('mongoose');

var sentenceSchema = mongoose.Schema({
  english: {  
  	type: String, 
  	index: true
  },
  filipino: String,
  verified: Boolean,
  isFormal: Boolean
}, { 
  autoIndex: true // set to false in production
});

module.exports = mongoose.model('sentences', sentenceSchema);