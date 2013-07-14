var App = window.App = angular.module('App', [
	'templates-app',
	'App.Controllers.Home',
	'App.Controllers.Settings',
	'App.Auth'
]).config(['$routeProvider', function($routeProvider) {
	// $routeProvider
	// 	.when('/', {
	// 		accessLevel: 'public',
	// 		redirectTo: '/'
	// 	});
}]);