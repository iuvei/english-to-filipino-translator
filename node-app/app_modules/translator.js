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

Translator.prototype.getFilWord = function(word, callback) {
  Word.findOne({ 'english': word }, 'filipino', function (err, res) {
    if (err) {
      throw err;
    };

    callback(res);
  });
};

Translator.prototype.NextTranslateFil = function () {
  var counter = 0;
  var string = '';
  var that = this;

  // a recursive function
	var func = function (arr, callback) {
		// iterate through the array (arr)
		that.getFilWord(arr[counter], function(res) {
	  	if (res) {
	  		string += ' ' + res.filipino;
	  	} else {
	  		string += ' ' + arr[counter];
	  	};
	  	
	  	if (counter === arr.length - 1) {
	  		return callback(string);
	  	} else {
	  		// increment the counter enclosed in a closure then call the function again.
	  		counter += 1;
	  		return func(arr, callback);
	  	}
	  });
	};

	return func;
}
Translator.prototype.algoTranslate = function(callback) {
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

	var nextTranslateFil = this.NextTranslateFil();
	nextTranslateFil.call(this, arr, function(data) {
		return callback({ string: data });
	});
	
};

Translator.prototype.combinePronounsAndVerbs = function (string) {
	phrase = string.toLowerCase()
	.replace(/(i|we|he|she|they|it|this|you)\s(should have not|may have not|will have not|must have not|shall have not|could have not|should have|may have|will have|must have|shall have|could have)/g, function(a,b,c) {
	  	var str = a;
		  str = str.replace(/\s/g, '')
		  return str;
	})
	.replace(/(i|we|he|she|they|it|this|you)\s(don't|do not|am not|are not|aren't|is not|isn't|were not|weren't|was not|wasn't|hadnt|had not|have not|haven't|am not|would not|may not|wouldn't|will not|should not|shouldn't|could not|couldn't|shall not|must not|is|are|was|will|have|were|should|could|would|am|shall|must|may|do)/g, function (a,b,c) {
	  var str = a;
	  str = str.replace(/'/g, '');
	  str = str.replace(/\s/g, '')
	  return str;
	})
	.replace(/(it)'(s)/g, function (a,b,c) {
	  var str = a;
	  str = str.replace(/'/g, 'i');
	  return str;
	})
	.replace(/(in the|of the|from the|for the|at the|on the|is so)/g, function (a,b,c) {
		var str = a;
		str = str.replace(/\s/g, '')
	  return str;
	})
	.replace(/(is|was|has|have|had)\s(already)/g, function (a,b,c) {
		var str = a;
		str = str.replace(/\s/g, '')
		return str;
	})
	.replace(/(i|you|she|they|we|he|it)\s(like|likes|liked)/g, function (a,b,c) {
		var str = a;
		str = str.replace(/\s/g, '')
		return str;
	})
	.replace(/(you|they|we)'(re)/g, function (a,b,c) {
		var str = a;
		str = str.replace(/'/g, 'a')
		return str;
	})
	.replace(/(do|did|have|had)\s(you)/g, function (a,b,c) {
		var str = a;
		str = str.replace(/\s/g, '')
		return str;
	})
	.replace(/(it|i|you|he|she|they|we|his|her|doyou|didyou|haveyou|hadyou)\s([A-Za-z0-9]*)/g, function(a,b,c) {
		return c + ' ' + b;
	});

	return phrase;
}

module.exports = new Translator();