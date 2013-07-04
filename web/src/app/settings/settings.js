angular.module('App.Controllers.Settings', [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/settings', {
				templateUrl: 'settings/settings.tpl.html',
				controller: 'SettingsController'
			});
	}])
	.controller('SettingsController', function($scope, $http, $location) {

		$scope.message = 'Settings page';

		$scope.goToAuthUrl = function() {
			// $location.url($scope.googleAuthUrl); /* Only changes url in browser window, doesn't actually navigate to new location */
			if ($scope.googleAuthUrl) {
				window.location = $scope.googleAuthUrl;
				// $location.url($scope.googleAuthUrl).replace();
			}
		};

		// Asynchronously grab Google authorization URL from server and attach it to scope.
		$http.get('http://localhost:8080/gapi/authUrl')
			.success(function(data) {
				console.log(data);
					$scope.googleAuthUrl = data.url;
			});
	});