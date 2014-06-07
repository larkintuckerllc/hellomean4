var indexControllers = angular.module('indexControllers', []);

indexControllers.controller('IndexHomeCtrl', ['$scope', 'linkedIn', 'navigator', function ($scope, linkedIn, navigator) {
	if (linkedIn.authenticated()) {
	} else {
		navigator.navigate('/login');	
	}
	$scope.logout = function() {
		linkedIn.logout();
		navigator.navigate('/login');	
	}	
	$scope.navigate = navigator.navigate;
}]);
