var	wordCheck = require("./app_modules/word-checker");
var	sentenceCheck = require("./app_modules/sentence-checker");
var translator = require("./app_modules/translator");
var suggestWords = require("./app_modules/suggest-words");
var suggestSentences = require("./app_modules/suggest-sentences");
var url = require('url');

module.exports = function(app) {
  app.post('/add-to-dictionary', function (req, res) {
  	var params = req.body;
  	var reply = {};

  	if (wordCheck.checkValid(params)) {
  	  // save to mongoDB
  	  reply = wordCheck.save(params);
    } else {
  	  reply = { status : 'Invalid word character.' };
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(reply));
  });

  app.post('/add-to-sentences', function (req, res) {
  	var params = req.body;
  	var reply = {};

  	if (sentenceCheck.checkValid(params)) {
  	  // save to mongoDB
  	  reply = sentenceCheck.save(params);
    } else {
  	  reply = { status : 'Invalid word character.' };
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(reply));
  });

  app.post('/translate-to-filipino', function (req, res) {
  	var params = req.body;
  	var reply = {};
  	var query;

  	translator.assignPhrase(params.phrase);

  	// removed below temporarily for testing purposes
  	/*
  	query = translator.getFilPhrase();
  	query.exec(function (err, data) {
	  if (err) {
	  	throw err;
	  };

	  for (var i = 0; i < data.length; i += 1) {
	  	reply[i] = data[i];
	  }

	  // let the algorithm translate
	  translator.algoTranslate();
	  //res.writeHead(200, {'Content-Type': 'application/json'});
	  //res.end(JSON.stringify(reply));
	});
	*/
	translator.algoTranslate(function (query) {
	  res.end(JSON.stringify(query));
	});
  });

  app.post('/suggest-words', function(req,res) {
  	var params = req.body;
  	var reply = {};
  	var query

  	suggestWords.chara = params.char;
  	query = suggestWords.query();
  	query.exec(function (err, data) {
	  if (err) {
	  	throw err;
	  };

	  for (var i = 0; i < data.length; i += 1) {
	  	reply[i] = data[i];
	  }

	  res.writeHead(200, {'Content-Type': 'application/json'});
	  res.end(JSON.stringify(reply));
	});
  });

  app.post('/suggest-sentences', function(req,res) {
  	var params = req.body;
  	var reply = {};
  	var query;

  	suggestSentences.chara = params.char;
  	query = suggestSentences.query();
  	query.exec(function (err, data) {
	  if (err) {
	  	throw err;
	  };

	  for (var i = 0; i < data.length; i += 1) {
	  	reply[i] = data[i];
	  }

	  res.writeHead(200, {'Content-Type': 'application/json'});
	  res.end(JSON.stringify(reply));
	});
  });

  app.post('/test', function (req, res) {
  	var phrase = req.body.phrase;
  	var new_phrase;

  	phrase = phrase.replace(/(i|we|he|she|they|it|this|you)\s(should have not|may have not|will have not|must have not|shall have not|could have not|should have|may have|will have|must have|shall have|could have)/g, function(a,b,c) {
  	  var str = a;
	  str = str.replace(/\s/g, '')
	  return str;
  	});
	new_phrase = phrase.replace(/(i|we|he|she|they|it|this|you)\s(don't|do not|am not|are not|aren't|is not|isn't|were not|weren't|was not|wasn't|hadnt|had not|have not|haven't|am not|would not|may not|wouldn't|will not|should not|shouldn't|could not|couldn't|shall not|must not|is|are|was|will|have|were|should|could|would|am|shall|must|may|do)/g, function (a,b,c) {
	  var str = a;
	  str = str.replace(/'/g, '');
	  str = str.replace(/\s/g, '')
	  return str;
	});
	res.end(new_phrase);
  })
};