var winesServices = angular.module('winesServices', ['ngResource']);

winesServices.factory('Wines', ['$resource', function($resource){
	return $resource('wines/:_id',{},{
		update: {method: 'PUT', params: {_id:'@_id'}},
		delete: {method: 'DELETE', params: {_id:'@_id'}}
	});
}]);
