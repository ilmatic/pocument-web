var expect = chai.expect;

describe('Auth module', function() {
	describe('LoginController', function() {
		var $scope, httpBackend, ctrl;
		// Load module configuration for Login module into injector.
		beforeEach(function() {
			module('App.Auth');
		});

		// Re-instantiate new variables for each unit test.
		beforeEach(inject(function($rootScope, $httpBackend, $controller, AuthRouteConfig) {
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
							return [200, {authToken: 'abc123'}, {}];
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

	describe('AuthProvider', function() {
		beforeEach(function() {
			module('App.Auth');
		});
		it('should return a user if user is logged in.');
		it('should return nothing if user is logged out.');
		it('should authorize a user for user-level access.', inject(function(AuthProvider) {
			var user = { role: 'user' };
			var route = { access: 'user' };
			var authorized = AuthProvider.authorize(user, route);
			expect(authorized).to.be.true;
		}));

		it('should not authorize a user for admin-level access.', inject(function(AuthProvider) {
			var user = { role: 'user' };
			var route = { access: 'admin' };
			var authorized = AuthProvider.authorize(user, route);
			expect(authorized).to.be.false;
		}));
	});

	describe('AuthRouteConfig', function() {
		var config;
		beforeEach(function() {
			module('App.Auth');
		});

		beforeEach(inject(function(AuthRouteConfig) {
			config = AuthRouteConfig;
		}));

		it('should contain public, user and admin roles.', function() {
			expect(config.userRoles).to.be.ok;
			expect(config.userRoles.public).to.be.ok;
			expect(config.userRoles.user).to.be.ok;
			expect(config.userRoles.admin).to.be.ok;
		});
		it('should contain public, anon, user and admin access levels.', function() {
			expect(config.accessLevels.public).to.be.ok;
			expect(config.accessLevels.anon).to.be.ok;
			expect(config.accessLevels.user).to.be.ok;
			expect(config.accessLevels.admin).to.be.ok;
		});
	});
});