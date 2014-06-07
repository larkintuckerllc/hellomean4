var wineriesServices = angular.module('wineriesServices', ['ngResource']);

wineriesServices.factory('Wineries', ['$resource', function($resource){
	return $resource('wineries/:_id',{},{
		update: {method: 'PUT', params: {_id:'@_id'}},
		delete: {method: 'DELETE', params: {_id:'@_id'}}
	});
}]);
