var winesControllers = angular.module('winesControllers', []);

winesControllers.controller('WinesListCtrl', ['$scope', 'navigator', 'Wines', 'Wineries', 'linkedIn', 'blockUI', function ($scope, navigator, Wines, Wineries, linkedIn, blockUI) {
        if (linkedIn.authenticated()) {
		$scope.error = false;
		$scope.wines = Wines.query(
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
		$scope.addWine = function() {
			blockUI.start();
			var newWine = new Wines({name: $scope.wineName, winery: $scope.winery_Id});
			newWine.$save(
				{token: linkedIn.token},
				function() {
					// SUCCESS
					$scope.error = false;
					$scope.wines.push(newWine);
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
			$scope.wineName = '';
			$scope.winery_Id = '';
		};
		$scope.navigate = navigator.navigate;
        } else {
                navigator.navigate('/login');
        }
}]);

winesControllers.controller('WinesDetailCtrl', ['$scope', 'navigator', '$routeParams', 'Wines', 'Wineries', 'linkedIn', 'blockUI',  function($scope, navigator, $routeParams, Wines, Wineries, linkedIn, blockUI) {
        if (linkedIn.authenticated()) {
		$scope.wine = Wines.get({token: linkedIn.token, _id: $routeParams._id}, 
			function() {
				// SUCCESS
				$scope.winery = Wineries.get({token: linkedIn.token, _id: $scope.wine.winery},
					function() {
						// SUCCESS
						$scope.wineName = $scope.wine.name;
					},
					function() {
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
			function() {
				// ERROR
				if (res.status == 403) {
					linkedIn.logout();
					navigator.navigate('/login');
				} else {
					navigator.navigate('/network-error');
				}
			}
		);
		$scope.updateWine = function() {
			blockUI.start();
			var oldWineName = $scope.wine.name;
			$scope.wine.name = $scope.wineName;
			$scope.wine.$update(
				{token: linkedIn.token},
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
							$scope.wineName = oldWineName;
							$scope.wine.name = oldWineName;
							blockUI.stop();
						} else {
							navigator.navigate('/network-error');
							blockUI.stop();
						}
					}
				}
			);
		};
		$scope.deleteWine = function() {
			blockUI.start();
			$scope.wine.$delete(
				{token: linkedIn.token},
				function() {
					// SUCCESS
					navigator.navigate('/wines');
					blockUI.stop();
				},
				function() {
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
