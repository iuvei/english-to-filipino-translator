var Sente = require('../models/sentence');

var SuggestSentences = function () {
	this.chara;
}

SuggestSentences.prototype.query = function() {
  var re = new RegExp('^' + this.chara, "i");
  return Sente.find({
  	english : re
  }).select({ filipino: 1, english: 1, isFormal: 1});
};

module.exports = new SuggestSentences();