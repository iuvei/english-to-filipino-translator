ETFDEM.config(function($routeProvider) {
  $routeProvider
  	.when('/', {
  		templateUrl: 'views/index.html',
  		controller: 'MainController'
  	})
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController'
    })
    .when('/admin/:words_dictionary', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
    })
    .otherwise({ redirectTo : '/' });
});