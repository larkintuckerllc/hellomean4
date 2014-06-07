var module = angular.module('linkedInServices', []);
module.service('linkedIn', ['$window', '$location', function($window, $location) {
	var service = {
		token: null
	};
	if ($window.localStorage) {
		service.token = $window.localStorage.getItem('token');	
	}
	service.authenticated = function() {
		return (service.token != null); 
	};
	service.login = function(token) {
		if ($window.localStorage) {
			service.token = token;
			$window.localStorage.setItem('token', token);
		}
	};
	service.logout = function() {
		if ($window.localStorage) {
			service.token = null;
			$window.localStorage.removeItem('token');
		}
	};
	return service;
}])
.run(function ($location, $window, linkedIn) {
	var token = $location.search().token;
	var state = $location.search().state;
	$location.search('token', null);
     	$location.search('state', null);
	if (token) {
		if ($window.localStorage) {
			var storedState = $window.localStorage.getItem('state');
			$window.localStorage.removeItem('state');
			if (state == storedState) {
				linkedIn.login(token);
			}
		}
	}
});
