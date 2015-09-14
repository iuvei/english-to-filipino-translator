ETFDEM.config(function($routeProvider) {
  $routeProvider
  	.when('/', {
  		templateUrl: 'views/index.html',
  		controller: 'MainController'
  	})
    .when('/admin', {
      templateUrl: 'views/admin/admin.html',
      controller: 'AdminController'
    })
    .when('/admin-sentence-add', {
        templateUrl: 'views/admin/add-sentence.html',
        controller: 'AdminController'
    })
    .when('/admin-words-add', {
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminController'
    })
    .otherwise({ redirectTo : '/' });
});