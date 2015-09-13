// launch mongodb manually from the mac:
// mongod --config /usr/local/etc/mongod.conf

var express = require('express'),
	app = express(),
	cors = require('cors');

app.use(cors());
app.post('/add-to-dictionary', function (req, res) {
  var params = req.body;
  console.log(params);
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});