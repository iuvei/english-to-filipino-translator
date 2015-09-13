var ETFDEM = angular.module('ETFDEM', ['ngRoute']);
ETFDEM.service("config", function () {
	this.NODEURL = 'http://localhost:8080/';
});