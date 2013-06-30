'use strict';

var expect = chai.expect;

describe('SettingsController', function() {
	var $httpBackend;

	// Reset and invoke new settingsController
	beforeEach(inject(function($injector) {
		// angular.mock.module('App');
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', '/gapi/authUrl').respond({ url: 'http://www.google.com' });
	}));

	describe('Google account settings', function() {
		it('requests a Google authorization URL from the server and injects it into the model', inject(function($rootScope, $controller) {


			var $scope = $rootScope.$new();
			var ctrl = $controller('SettingsController', {
				$scope: $scope
			})
		}));
	});
});