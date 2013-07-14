var App = window.App = angular.module('App', [
	'ui.state',
	'templates-app',
	'App.Controllers.Home',
	'App.Controllers.Settings',
	'App.Auth'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	'use strict';
	$urlRouterProvider
		.otherwise('/');

	// $stateProvider
	// 	.when('/', {
	// 		accessLevel: 'public',
	// 		redirectTo: '/'
	// 	});
}]);