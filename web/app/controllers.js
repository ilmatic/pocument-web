define([
	'angular'
], function(angular) {
	console.log('Controller.js loading...');
	return angular.module('PocumentApp.controllers', [])

		// Simple controller loaded synchronously.
		.controller('RootController', ['$scope', function($scope) {
			$scope.message = 'Hello, Moto.';
		}])

		// More complex controller required from external file asynchronously.
		.controller('SettingsController', ['$scope', '$injector', function($scope, $injector) {
			require(['app/controllers/settingsController'], function(settingsController) {
				$injector.invoke(settingsController, this, {'$scope': $scope});
			});
		}])
});