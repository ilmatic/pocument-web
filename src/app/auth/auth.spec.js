'use strict';

/* Module dependencies */
var expect = chai.expect;

/* Module constants */
var LOGIN_PENDING = 'LOGIN_PENDING';
var LOGIN_FAILED = 'LOGIN_FAILED';
var LOGIN_SUCCESS = 'LOGIN_SUCCESS';

describe('Auth module', function () {
	describe('LoginController', function () {
		var $scope, httpBackend, loginController;

		/* Load module configuration for Login module into injector. */
		beforeEach(function () {
			module('ui.state');
			module('App.Root');
			module('App.Auth');
		});

		describe('$scope.submitLogin()', function () {
			/* Re-instantiate new variables for each unit test. */
			beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
				$scope = $rootScope.$new();
				loginController = $controller('LoginController', {$scope: $scope});

				/* Setup $httpBackend to receive authentication requests. */
				httpBackend = $httpBackend;
				httpBackend
					.when('POST', 'http://localhost:8000/auth/login')
					.respond(function (method, url, data) {
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

			it('should set the loginState to "" as default.', function () {
				expect($scope.loginState).to.equal('');
			});

			it('should change loginState to ' + LOGIN_PENDING + ' while authenticating a login.', function () {
				$scope.submitLogin();
				expect($scope.loginState).to.equal(LOGIN_PENDING);
				httpBackend.flush();
			});

			it('should change loginState to ' + LOGIN_FAILED + ' if user login fails.', function () {
				$scope.credentials = {
					username: 'wrongUser',
					password: 'wrongPassword1'
				};
				$scope.submitLogin();
				httpBackend.flush();
				expect($scope.loginState).to.equal(LOGIN_FAILED);
			});

			it('should change loginState to ' + LOGIN_SUCCESS + ' if user login succeeds.', function () {
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

	describe('AuthProvider', function () {
		var authProvider,
			rootScope;

		/* Load module configuration for AuthProvider into injector. */
		beforeEach(function () {
			module('ui.state');
			module('App.Root');
			module('App.Auth');
		});

		beforeEach(inject(function (AuthProvider, $rootScope) {
			authProvider = AuthProvider;
			rootScope = $rootScope;
		}));

		describe('loginUser()', function () {

			it('should emit a userWillLogin event when login begins.', function (done) {
				rootScope.$on('userWillLogin', function () {
					done();
				});

				authProvider.loginUser();
			});

			it('should emit a userDidLogin event when login is complete.', function (done) {
				rootScope.$on('userDidLogin', function () {
					done();
				});

				authProvider.loginUser();
			});

		});

		describe('logoutUser()', function () {

			it('should emit a userWillLogout event when logout begins.', function (done) {
				rootScope.$on('userWillLogout', function () {
					done();
				});

				authProvider.logoutUser();
			});

			it('should emit a userDidLogout event when logout is complete.', function (done) {
				rootScope.$on('userDidLogout', function () {
					done();
				});

				authProvider.logoutUser();
			});

		});

		describe('getUser()', function () {

			/**
			 * TODO: authProvider.setUser() should be wrapped inside of loginUser(),
			 * similar to how resetCookie is wrapped inside of logoutUser()
			 */

			beforeEach(function () {
				authProvider.setUser({ username: 'TestUser' });
			});

			it('should return a user if user is logged in.', function () {
				var user = authProvider.getUser();
				expect(user).to.be.ok;
				expect(user).to.have.property('username', 'TestUser');
			});

			it('should return undefined if user is logged out.', function () {
				authProvider.logoutUser();

				var user = authProvider.getUser();
				expect(user).to.be.undefined;
			});

		});

		describe('setUser(user)', function () {

			beforeEach(function () {
				authProvider.logoutUser();
			});

			it('should store the specified user object.', function () {
				var user = { username: 'TestUser' };
				var result = authProvider.getUser();

				expect(result).to.be.undefined;

				authProvider.setUser(user);
				result = authProvider.getUser();

				expect(result).to.be.ok;
				expect(result).to.have.property('username', 'TestUser');
			});

		});

		describe('getAccessToken()', function () {

		});

		describe('setAccessToken(token)', function () {

		});

		describe('authorize()', function () {
			it('should authorize a user for user-level access.', function () {
				var user = { role: 'user' };
				var route = { access: 'user' };
				var authorized = authProvider.authorize(user, route);
				expect(authorized).to.be.true;
			});

			it('should not authorize a user for admin-level access.', function () {
				var user = { access: { role: 'user' } };
				var route = { accessLevel: 'admin' };
				var authorized = authProvider.authorize(user, route);
				expect(authorized).to.be.false;
			});
		});
	});

	describe('AuthRouteConfig', function () {
		var config;
		
		/* Load module configuration for Login module into injector. */
		beforeEach(function () {
			module('ui.state');
			module('App.Root');
			module('App.Auth');
		});

		beforeEach(inject(function (AuthRouteConfig) {
			config = AuthRouteConfig;
		}));

		it('should contain public, user and admin roles.', function () {
			expect(config.userRoles).to.be.ok;
			expect(config.userRoles.public).to.be.ok;
			expect(config.userRoles.user).to.be.ok;
			expect(config.userRoles.admin).to.be.ok;
		});
		
		it('should contain public, anon, user and admin access levels.', function () {
			expect(config.accessLevels.public).to.be.ok;
			expect(config.accessLevels.anon).to.be.ok;
			expect(config.accessLevels.user).to.be.ok;
			expect(config.accessLevels.admin).to.be.ok;
		});
	});
});