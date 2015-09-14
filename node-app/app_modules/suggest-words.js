var Dict = require('../models/dict');

var SuggestWords = function () {
	this.chara;
}

SuggestWords.prototype.query = function() {
  var re = new RegExp('^' + this.chara, "i");
  return Dict.find({
  	english : re
  }).select({ filipino: 1, english: 1, type: 1});
};

module.exports = new SuggestWords();