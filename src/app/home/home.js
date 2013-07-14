angular.module('App.Controllers.Home', [])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'home/home.tpl.html',
				controller: 'HomeController',
				accessLevel: 'public'
			});
	}])
	.controller('HomeController', function($scope) {
		$scope.message = 'Hello, Homo.';
	});