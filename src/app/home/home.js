/** 
 * App.Home - Home module 
 * =================================================================
 * 
 * 
*/

angular.module('App.Home', [])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('root.home', {
				url: '/home',
				templateUrl: 'home/home.tpl.html',
				controller: 'HomeController',
				accessLevel: 'public'
			});
	}])
	.controller('HomeController', function($scope) {
		$scope.message = 'Hello, Homo.';
	});