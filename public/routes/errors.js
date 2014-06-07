angular.module('myApp').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {
      	  		templateUrl: 'views/errors-login.html',
       			controller: 'LoginErrorCtrl'
		}).
		when('/network-error', {
      	  		templateUrl: 'views/errors-network.html',
       			controller: 'NetworkErrorCtrl'
      		})
}]);
