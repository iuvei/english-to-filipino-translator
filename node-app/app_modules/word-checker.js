var Dict = require('../models/dict');

var WordCheck = function () {
	this.eng, this.fil;
}

WordCheck.prototype.checkValid = function(param) {
	if (typeof(param.english) !== 'undefined' && typeof(param.filipino) !== 'undefined') {
	  // only alphabet characters allowed
	  var re = /^[A-Za-z\s]+$/g;
	  if (re.test(param.english) === false) {
	  	return false;
	  };

	  /*
	  re = /^[A-Za-z\s]+$/g; // re-declare re otherwise false results
	  if (re.test(param.filipino) === false) {
	  	return false;
	  };
	  */

	  return true;
	}
};

WordCheck.prototype.save = function(param) {
  var dict = new Dict();
  dict.english = param.english.toLowerCase();
  dict.filipino = param.filipino;
  dict.type = param.type;
  dict.verified = 1; // set verified to true
  dict.save(function(err) {
    if (err) {
	  throw err;	
    };

    return { status : 'success' };
  });
};

module.exports = new WordCheck();