// GLOBALS: describe beforeEach it expect
define([
	'angular',
	'angularMocks',
	'chai'
], function(angular, mocks, chai) {
	'use strict';
	var expect = chai.expect;

	console.log('ngMocks: ');
	console.dir(mocks);

	describe('SettingsController', function() {
		var scope, settingsController;

		// Reset and invoke new settingsController
		beforeEach(function() {
			// mocks.module('PocumentApp.controllers')
			// 	.controller('SettingsController', ['$scope', '$injector', function($scope, $injector) {
			// 		require(['app/controllers/settingsController'], function(settingsController) {
			// 			$injector.invoke(settingsController, this, {'$scope': $scope});
			// 		});
			// 	}]);
			// mocks.inject(function($rootScope, $controller) {
			// 	scope = $rootScope.$new();
			// 	settingsController = $controller('SettingsController', {'$scope': $scope});
			// });
		});

		describe('Google account settings', function() {
			it('sends a request to server for Google authorization URL', function() {
				expect(1).to.be.ok;
				expect(scope)
			});
		});
	});
});
