var Dictionary = function () {
	this.eng, this.fil;
}

Dictionary.prototype.checkValidWord = function(word) {
	// only alphabet characters allowed
	re = /[A-Za-z]+/g;
	return re.test(word);
};

Dictionary.prototype.english = function(word) {
	this.eng = word;
};

Dictionary.prototype.filipino = function(word) {
	this.file = word;
};

module.exports = new Dictionary();