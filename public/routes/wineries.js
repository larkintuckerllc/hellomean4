angular.module('myApp').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/wineries', {
      	  		templateUrl: 'views/wineries-list.html',
       			controller: 'WineriesListCtrl'
      		}).
     		when('/wineries/:_id', {
       			templateUrl: 'views/wineries-detail.html',
			controller: 'WineriesDetailCtrl'
      		})
}]);
