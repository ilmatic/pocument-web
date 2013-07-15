angular.module('App.Root', [])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('root', {
				// url: '/',
				abstract: true,
				templateUrl: 'root/root.tpl.html',
				controller: 'RootController',
				accessLevel: 'public'
			});
	}])
	.controller('RootController', ['$scope', 'AuthProvider', 'NavigationService', function RootController($scope, AuthProvider, NavigationService) {
		$scope.greeting = 'Hello Pocument';
		$scope.user = AuthProvider.getUser();

		$scope.logout = function() {
			AuthProvider.logoutUser();
		};

		$scope.$on('userDidLogin', function() {
			console.log('RootController: userDidLogin');
			$scope.user = AuthProvider.getUser();
		});

		$scope.$on('userDidLogout', function() {
			console.log('RootController: userDidLogout');
			$scope.user = AuthProvider.getUser();
		});

		$scope.$on('locationChangeStart', function() {
			console.log('locationChangeStart received');
			$scope.greeting = NavigationService.location;
		});
	}])
	.factory('NavigationService', ['$rootScope', function NavigationService($rootScope) {

		var navigationService = {};

		navigationService.broadcastLocation = function() {
			$rootScope.$broadcast('locationChangeStart');
		};

		navigationService.changeLocation = function(location) {
			this.location = location;
			this.broadcastLocation();
		};

		return navigationService;
	}]);