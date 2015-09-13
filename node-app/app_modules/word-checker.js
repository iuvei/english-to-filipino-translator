var WordCheck = function () {
	this.eng, this.fil;
}

WordCheck.prototype.checkValid = function(word) {
	// only alphabet characters allowed
	re = /[A-Za-z]+/g;
	return re.test(word);
};

WordCheck.prototype.english = function(word) {
	this.eng = word;
};

WordCheck.prototype.filipino = function(word) {
	this.fil = word;
};

module.exports = new WordCheck();