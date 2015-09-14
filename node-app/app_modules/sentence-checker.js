var Sentence = require('../models/sentence');

var SentenceCheck = function () {
	this.eng, this.fil;
}

SentenceCheck.prototype.checkValid = function(param) {
	if (typeof(param.english) !== 'undefined' && typeof(param.filipino) !== 'undefined') {
	  // only these characters allowed
	  var re = /^[A-Za-z0-9!,:;\-\.?@\s]+$/g;
	  if (re.test(param.english) === false) {
	  	return false;
	  };

	  re = /^[A-Za-z0-9!,:;\-\.?@\s]+$/g; // re-declare re otherwise false results
	  if (re.test(param.filipino) === false) {
	  	return false;
	  };

	  return true;
	}
};

SentenceCheck.prototype.save = function(param) {
  var sentence = new Sentence();
  sentence.english = param.english;
  sentence.filipino = param.filipino;
  sentence.verified = 1; // set verified to true
  sentence.isFormal = param.isFormal;
  sentence.save(function(err) {
    if (err) {
	  throw err;	
    };

    return { status : 'success' };
  });
};

module.exports = new SentenceCheck();