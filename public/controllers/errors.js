var errorsControllers = angular.module('errorsControllers', []);

errorsControllers.controller('NetworkErrorCtrl', ['$scope', '$window', function ($scope, $window) {
	$scope.reloadApplication = function() {
		$window.location.href = '/';
	}
}]);

errorsControllers.controller('LoginErrorCtrl', ['$location','$scope', '$window', 'linkedIn',function ($location, $scope, $window, linkedIn) {
	$scope.login = function() {
		var state = Date.now();
		if ($window.localStorage) {
                        $window.localStorage.setItem('state', state);
                }
		$window.location.href = '/linkedin/login?state=' + state;
	}
}]);
