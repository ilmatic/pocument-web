angular.module('App.Controllers.Home', [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'home/home.tpl.html',
				controller: 'HomeController',
				accessLevel: 'public'
			});
	}])
	.controller('HomeController', function($scope) {
		$scope.message = 'Hello, Homo.';
	});