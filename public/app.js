var myApp = angular.module('myApp', [
	'ngRoute',
	'blockUI',
	'mobile-angular-ui',
	'linkedInServices',
	'navigatorServices',
	'winesServices',
	'wineriesServices',
	'winesControllers',
	'wineriesControllers',
	'errorsControllers',
	'indexControllers'
])
.config(function(blockUIConfigProvider) {
	blockUIConfigProvider.autoBlock(false);
});
