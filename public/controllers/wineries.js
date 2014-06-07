var wineriesControllers = angular.module('wineriesControllers', []);

wineriesControllers.controller('WineriesListCtrl', ['$scope', 'navigator', 'Wineries', 'linkedIn', 'blockUI', function ($scope, navigator, Wineries, linkedIn, blockUI) {
	if (linkedIn.authenticated()) {
		$scope.error = false;
		$scope.wineries = Wineries.query(
			{token: linkedIn.token},	
			function() {
				// SUCCESS
			},
			function(res) {
				// ERROR
				if (res.status == 403) {
					linkedIn.logout();
					navigator.navigate('/login');
				} else {
					navigator.navigate('/network-error');
				}
			}
		);
		$scope.addWinery = function() {
			blockUI.start();
			var newWinery = new Wineries({name: $scope.wineryName});
			newWinery.$save({token: linkedIn.token},
				function() {
					// SUCCESS
					$scope.error = false;
					$scope.wineries.push(newWinery);
					blockUI.stop();
				},
				function(res) {
					// ERROR
					if (res.status == 403) {
						linkedIn.logout();
						navigator.navigate('/login');
						blockUI.stop();
					} else {
						if (res.status == 400) {
							$scope.error = true;
							blockUI.stop();
						} else {
							navigator.navigate('/network-error');
							blockUI.stop();
						}
					}
				}
			);
			$scope.wineryName = '';
		};
		$scope.navigate = navigator.navigate;
	} else {
		navigator.navigate('/login');
	}
}]);

wineriesControllers.controller('WineriesDetailCtrl', ['$scope', 'navigator', '$routeParams', 'Wineries', 'Wines', 'linkedIn', 'blockUI', function($scope, navigator, $routeParams, Wineries, Wines, linkedIn, blockUI) {
	if (linkedIn.authenticated()) {
		$scope.error = false;
		$scope.winery = Wineries.get({token: linkedIn.token, _id: $routeParams._id}, 
			function() {
				// SUCCESS
				$scope.wines = Wines.query(
					{token: linkedIn.token, winery: $routeParams._id},
					function() {
						// SUCCESS
						$scope.wineryName = $scope.winery.name;	
					},
					function(res) {
						// ERROR
						if (res.status == 403) {
							linkedIn.logout();
							navigator.navigate('/login');
						} else {
							navigator.navigate('/network-error');
						}
					}
				);
			},
			function(res) {
				// ERROR
				if (res.status == 403) {
					linkedIn.logout();
					navigator.navigate('/login');
				} else {
					navigator.navigate('/network-error');
				}
			}
		);
		$scope.updateWinery = function() {
			blockUI.start();
			var oldWineryName = $scope.winery.name;
			$scope.winery.name = $scope.wineryName;
			$scope.winery.$update({token: linkedIn.token}, 
				function() {
					// SUCCESS
					$scope.error = false;
					blockUI.stop();
				},
				function(res) {
					// ERROR
					if (res.status == 403) {
						linkedIn.logout();
						navigator.navigate('/login');
						blockUI.stop();
					} else {
						if (res.status == 400) {
							$scope.error = true;
							$scope.wineryName = oldWineryName;
							$scope.winery.name = oldWineryName;
							blockUI.stop();
						} else {
							navigator.navigate('/network-error');
							blockUI.stop();
						}
					}
				}
			);
		};
		$scope.deleteWinery = function() {
			blockUI.start();
			$scope.winery.$delete({token: linkedIn.token}, 
				function() {
					// SUCCESS
					navigator.navigate('/wineries');
					blockUI.stop();
				},
				function(res) {
					// ERROR
					if (res.status == 403) {
						linkedIn.logout();
						navigator.navigate('/login');
						blockUI.stop();
					} else {
						navigator.navigate('/network-error');
						blockUI.stop();
					}
				}
			);
		};
		$scope.navigate = navigator.navigate;
	} else {
		navigator.navigate('/login');
	}
}]);
