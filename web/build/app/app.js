var App = window.App = angular.module('App', [
	'templates-web-build',
	'App.Controllers.Home',
	'App.Controllers.Settings',
	'App.Login'
]).config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: '/home'});
}]);