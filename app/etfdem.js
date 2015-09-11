// declare the app
var ETFDEM = angular.module('ETFDEM', ['ngRoute'])

.controller('MainController', function($scope) {
  $scope.phrase = '';
  $scope.translatePhrase = function() {
  	console.log($scope.phrase);
  };

  // phrases must only contain alphanumeric and space characters
  $('#phrase').on('keyup', function(e) {
  	// if enter key, translate
  	if (e.which === 13) {
  		$scope.translatePhrase();
  		return;
  	}
  	// if key pressed is not equal to space key
  	// note: buggy behaviour without this IF statement for checking the space character.
  	if (e.which !== 32) {
  		$scope.phrase = $scope.phrase.replace(/[^A-Za-z0-9\s]+/g, '');
  		$('#phrase').val($scope.phrase);
  	}
  });
})
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  	.when('/', {
  		templateUrl: 'views/index.html',
  		controller: 'MainController'
  	})
    .when('/admin', {
      templateUrl: 'admin.html',
      controller: 'AdminController'
    })
    .otherwise({ redirectTo : '/' });
});