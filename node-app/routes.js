var	wordCheck = require("./app_modules/word-checker");
var	sentenceCheck = require("./app_modules/sentence-checker");
var translator = require("./app_modules/translator");
var suggestWords = require("./app_modules/suggest-words");
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
  	query = translator.getFilPhrase();
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

  app.get('/test', function (req, res) {
  	var phrase = "the birds ate the bread";
  	var new_phrase;
	new_phrase = phrase.replace(/(i|we|he|she|they|it|this)\s(don't|do not|am not|are not|aren't|is not|isn't|were not|weren't|was not|wasn't|hadnt|had not|have not|haven't|am not|would not|wouldn't|should not|shouldn't|could not|couldn't|is|are|was|have|were|should|could|would|am)/g, function (a,b,c) {
	  var str = a;
	  str = str.replace(/'/g, '');
	  str = str.replace(/\s/g, '')
	  return str;
	});

	res.end(new_phrase);
  })
};