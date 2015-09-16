var Sentence = require('../models/sentence');
var Word = require('../models/dict');

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

Translator.prototype.getFilWord = function(word) {
  Word.findOne({ 'english': word }, 'filipino', function (err, res) {
    if (err) {
      throw err;
    };

    console.log(typeof(res.filipino));
    if (res.filipino) {
    	return res.filipino
    }

    return '';

  });
};

Translator.prototype.algoTranslate = function() {
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
	var phrase = this.phrase.toLowerCase();
	var new_phrase = this.combinePronounsAndVerbs(phrase);
	var arr = new_phrase.split(" ");
	var arrlength = arr.length;
	var string_result = '';
	var fil = '';

	for (var i = 0; i < arrlength; i += 1) {
	  fil = this.getFilWord(arr[i]);

	  if (!fil) {
	  	string_result += ' ' + arr[i];
	  } else {
	  	string_result += ' ' + fil;
	  }
	};

	return { string : string_result.trim() };
};

Translator.prototype.combinePronounsAndVerbs = function (string) {
	phrase = string.toLowerCase();

	phrase = phrase.replace(/(i|we|he|she|they|it|this|you)\s(should have not|may have not|will have not|must have not|shall have not|could have not|should have|may have|will have|must have|shall have|could have)/g, function(a,b,c) {
  	  var str = a;
	  str = str.replace(/\s/g, '')
	  return str;
  	});

	phrase = phrase.replace(/(i|we|he|she|they|it|this|you)\s(don't|do not|am not|are not|aren't|is not|isn't|were not|weren't|was not|wasn't|hadnt|had not|have not|haven't|am not|would not|may not|wouldn't|will not|should not|shouldn't|could not|couldn't|shall not|must not|is|are|was|will|have|were|should|could|would|am|shall|must|may|do)/g, function (a,b,c) {
	  var str = a;
	  str = str.replace(/'/g, '');
	  str = str.replace(/\s/g, '')
	  return str;
	});

	phrase = phrase.replace(/(in the|of the|from the|for the|at the|on the)/g, function (a,b,c) {
	  var str = a;
	  str = str.replace(/\s/g, '')
	  return str;
	});

	return phrase;
}

module.exports = new Translator();