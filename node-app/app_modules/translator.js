var Sentence = require('../models/sentence');

var Translator = function () {
	this.phrase;
}

Translator.prototype.assignPhrase = function(phrase) {
	this.phrase = phrase;
};

// get Filipino phrase in the DB
Translator.prototype.getFilPhrase = function() {
  var phrase = this.phrase;
  var re;
  phrase = phrase.replace(/[,\.!?]/g, "");
  re = new RegExp(phrase, "gi");
  return Sentence.find({
  	english : re
  }).select({ filipino: 1, isFormal: 1});
};

Translator.prototype.getEngPhrase = function() {
  var phrase = this.phrase;
  var re;
  phrase = phrase.replace(/[,\.!?]/g, "");
  re = new RegExp(phrase, "gi");
  return Sentence.find({
  	filipino : re
  }).select({ english: 1, isFormal: 1});
};

Translator.prototype.analyze = function() {
	/*
	  i dont like you
	  hindi ko gusto ikaw
	  
	  i dont want to go there
	  hindi ko gusto pumunta doon

	  i like you
	  ako gusto ikaw

	  like you, i am lazy
	  tulad mo, ako ay tamad
	*/
	var phrase = this.phrase;
};

Translator.prototype.combineWords = function (string) {
	var new_string = string.toLowerCase();

	new_string = string.replace("i don't" , "idont");
	new_string = string.replace("i do not" , "idont");
	new_string = string.replace("i won't" , "iwont");
	new_string = string.replace("i wont" , "iwont");
	new_string = string.replace("i have not" , "ihavent");
	new_string = string.replace("i haven't" , "ihavent");
	new_string = string.replace("i would" , "iwould");
	new_string = string.replace("i would not" , "iwouldnt");
	new_string = string.replace("i wouldn't" , "iwouldnt");
	new_string = string.replace("i could not" , "icouldnt");
	new_string = string.replace("i couldn't" , "icouldnt");
	new_string = string.replace("i should not" , "ishouldnt");
}

module.exports = new Translator();