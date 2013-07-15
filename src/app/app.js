var App = window.App = angular.module('App', [
	'ui.state',
	'templates-app',
	'App.Root',
	'App.Home',
	'App.Settings',
	'App.Auth'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	'use strict';
	$urlRouterProvider
		.otherwise('/home');
}]);