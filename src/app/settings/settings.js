angular.module('App.Settings', ['App.Auth'])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('root.settings', {
				url: '/settings',
				templateUrl: 'settings/settings.tpl.html',
				controller: 'SettingsController',
				accessLevel: 'user'
			});
	}])
	.controller('SettingsController', function($scope, AuthHttp, $location, AuthProvider, NavigationService) {

		$scope.message = 'Settings page';
		NavigationService.changeLocation('Hello Settings');

		$scope.goToAuthUrl = function() {
			// $location.url($scope.googleAuthUrl); /* Only changes url in browser window, doesn't actually navigate to new location */
			if ($scope.googleAuthUrl) {
				window.location = $scope.googleAuthUrl;
				// $location.url($scope.googleAuthUrl).replace();
			}
		};

		// Asynchronously grab Google authorization URL from server and attach it to scope.
		// var user = AuthProvider.getUser();
		// $http.post('http://localhost:8080/gapi/authUrl', {user: user})
		// 	.success(function(data) {
		// 		console.log(data);
		// 			$scope.googleAuthUrl = data.url;
		// 	});
		AuthHttp.post('http://localhost:8000/gapi/authUrl')
			.success(function(data) {
				console.log(data);
				$scope.googleAuthUrl = data.url;
			});
	});