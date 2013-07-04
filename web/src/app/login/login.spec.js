var expect = chai.expect;

describe('Login module', function() {
	describe('LoginController', function() {
		var $scope, httpBackend, ctrl;
		// Load module configuration for Login module into injector.
		beforeEach(function() {
			module('App.Login');
		});

		// Re-instantiate new variables for each unit test.
		beforeEach(inject(function($rootScope, $httpBackend, $controller) {
			$scope = $rootScope.$new();
			ctrl = $controller('LoginController', {$scope: $scope});

			httpBackend = $httpBackend;
			// Setup $httpBackend to receive authentication requests.
			httpBackend
				.when('POST', 'http://localhost:8080/auth/login')
				.respond(function(method, url, data, headers) {
					// console.log('POST Request: ');
					data = angular.fromJson(data);
					console.log('POST request');
					console.log(data);
					if (data.credentials) {
						if (data.credentials.username == 'TestUser' && data.credentials.password == 'Welcome1') {
							return [200, {authKey: 'abc123'}, {}];
						}
						return [401, 'Invalid login credentials.', {}];
					}

					return [401, 'No login credentials.', {}];
				});
		}));

		it('should have a LoginController', function() {
			expect(ctrl).to.be.ok;
		});

		it('should set the loginState to "" as default.', function() {
			expect($scope.loginState).to.equal('');
		});

		it('should change loginState to ' + LOGIN_PENDING + ' while authenticating a login.', function() {
			$scope.submitLogin();
			expect($scope.loginState).to.equal(LOGIN_PENDING);
			httpBackend.flush();
		});

		it('should change loginState to ' + LOGIN_FAILED + ' if user login fails.', function() {
			$scope.credentials = {
				username: 'wrongUser',
				password: 'wrongPassword1'
			};
			$scope.submitLogin();
			httpBackend.flush();
			expect($scope.loginState).to.equal(LOGIN_FAILED);
		});

		it('should change loginState to ' + LOGIN_SUCCESS + ' if user login succeeds.', function() {
			$scope.credentials = {
				username: 'TestUser',
				password: 'Welcome1'
			};
			$scope.submitLogin();
			httpBackend.flush();
			expect($scope.loginState).to.equal(LOGIN_SUCCESS);
		});
	});
});