/*
var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

app.use(function(req, res) {
	var data = 'hello there';

	res.writeHead('200', { 'Content-Type' : 'text/html' });
	res.end(data);
});
app.listen(port);

console.log('server start on port %s', port);
*/

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});