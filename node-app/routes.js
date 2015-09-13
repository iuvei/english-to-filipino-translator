var	wordCheck = require("./app_modules/word-checker");
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
};