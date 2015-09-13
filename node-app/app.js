// launch mongodb manually from the mac:
// mongod --config /usr/local/etc/mongod.conf

var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose'),
	fs = require('fs'),
	config = require("./config/config.js");

//connect to db
mongoose.connect(config.db.url);

app.use(cors());
app.use(bodyParser.json());
require('./routes')(app);

app.listen(8080, function() {
  console.log('Listening at 8080');
});
