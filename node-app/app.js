// launch mongodb manually from the mac:
// mongod --config /usr/local/etc/mongod.conf

var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require("body-parser"),
	wordCheck = require("./app_modules/word-checker");

app.use(cors());
app.use(bodyParser.json());
app.post('/add-to-dictionary', function (req, res) {
  var params = req.body;
  var reply = {};

  if (wordCheck.checkValid(params.english) && wordCheck.checkValid(params.filipino)) {
  	wordCheck.english(params.english);
  	wordCheck.filipino(params.filipino);
  	reply = { status : 'success' };
  } else {
  	reply = { status : 'Invalid word character.' };
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(reply));
});
app.listen(8080, function() {
  console.log('Listening at 8080');
});
