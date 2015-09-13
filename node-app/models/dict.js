var mongoose = require('mongoose');

var dictSchema = mongoose.Schema({
  english: {  
  	type: String, 
  	index: true
  },
  filipino: String,
  type: String,
  verified: Boolean
}, { 
  autoIndex: true // set to false in production
});

module.exports = mongoose.model('dictionary', dictSchema);