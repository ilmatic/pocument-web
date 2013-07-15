/** 
 * App.Auth - Authentication module 
 * =================================================================
 * Provides login view/controller.
 * 
 * Provides a login service which checks for cached credentials from 
 * a specified service, i.e., cookies or localStorage
 * 
*/

AUTH_LOGGED_IN = 'AUTH_LOGGED_IN';
AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT';
LOGIN_PENDING = 'LOGIN_PENDING';
LOGIN_FAILED = 'LOGIN_FAILED';
LOGIN_SUCCESS = 'LOGIN_SUCCESS';

angular.module('App.Auth', ['App.Session'])
	

	/**
	 * Setup states for App.Auth module.
	 * @param  {Function} $stateProvider
	 */
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('root.login', {
				url: '/login',
				templateUrl: 'auth/login.tpl.html',
				controller: 'LoginController',
				accessLevel: 'public'
			});
	}])

	/**
	 * AuthRouteConfig
	 * Configuration object App.Auth state authenticator.
	 * @return {[type]}
	 */
	.factory('AuthRouteConfig', function() {
		var config = {
			
			/**
			 * List all the roles used in the app.
			 * Maximum of 31 before bit shift pushes accompanying integer out of memory footprint.
			 * @type {Array}
			 */
			roles: [
				'public',
				'user',
				'admin'
			],

			/**
			 * Define access levels for roles listed above.
			 * Use "*" symbol to represent access to all routes.
			 * @type {Object}
			 */
			accessLevels: {
				'public': '*',
				'anon': ['public'],
				'user': ['user', 'admin'],
				'admin': ['admin']
			}
		};

		/**
		 * Build roles object used by App.Auth state authenticator.
		 * @param  {Array} roles
		 * @return {Object}
		 */
		function buildRoles(roles) {
			var bitMask = '01';
			var userRoles = {};

			for (var role in roles) {
				var intCode = parseInt(bitMask, 2);
				userRoles[roles[role]] = {
					bitMask: intCode,
					title: roles[role]
				};
				bitMask = (intCode << 1).toString(2);
			}

			return userRoles;
		}

		/**
		 * Build access levels object which that authorize() will check
		 * roles and access levels of states against.
		 * @param  {Object} accessLevelDeclarations
		 * @param  {Object} userRoles
		 * @return {Object}
		 */
		function buildAccessLevels(accessLevelDeclarations, userRoles) {
			var accessLevels = {};
			for (var level in accessLevelDeclarations) {
				if (typeof accessLevelDeclarations[level] == 'string') {
					if (accessLevelDeclarations[level] == '*') {
						var resultBitMask = '';

						for (var role in userRoles) {
							resultBitMask += '1';
						}

						accessLevels[level] = {
							bitMask: parseInt(resultBitMask, 2),
							title: accessLevelDeclarations[level]
						};
					} else {
						console.log('Access Control Error: Could not parse "' + accessLevelDeclarations[level] + '" as access definition for level "' + level + '".');
					}
				} else {
					var resultBitMask = 0;
					for (var role in accessLevelDeclarations[level]) {
						if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
							resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
						} else {
							console.log('Access Control Error: Could not find role "' + accessLevelDeclarations[level][role] + '" in registered roles while building access for "' + level + '".');
						}
					}
					accessLevels[level] = {
						bitMask: resultBitMask,
						title: accessLevelDeclarations[level]
					};
				}
			}

			return accessLevels;
		}

		var userRoles = buildRoles(config.roles);
		var accessLevels = buildAccessLevels(config.accessLevels, userRoles);

		return {
			userRoles: userRoles,
			accessLevels: accessLevels
		};
	})

	/**
	 * AuthProvider
	 * @param  {[type]} SessionProvider
	 * @param  {[type]} AuthRouteConfig
	 * @param  {[type]} $rootScope
	 * @return {[type]}
	 */
	.factory('AuthProvider', ['SessionProvider', 'AuthRouteConfig', '$rootScope', function(SessionProvider, AuthRouteConfig, $rootScope) {
		return {
			loginUser: function() {
				$rootScope.$broadcast('userWillLogin');

				$rootScope.$broadcast('userDidLogin');
			},
			logoutUser: function() {
				$rootScope.$broadcast('userWillLogout');
				SessionProvider.resetCookie('user');
				$rootScope.$broadcast('userDidLogout');
			},
			getUser: function() {
				var user = SessionProvider.getCookie('user');
				console.log('AuthProvider.getUser: ', user);
				return user ? JSON.parse(user) : '';
			},
			setUser: function(user) {
				var jsonUser = JSON.stringify(user);
				console.log('AuthProvider.setUser: ', jsonUser);
				SessionProvider.setCookie('user', jsonUser);
			},
			getAccessLevel: function() {

			},
			getAuthState: function() {
				if (SessionProvider.getCookie('authToken')) {
					return AUTH_LOGGED_IN;
				}
				return AUTH_LOGGED_OUT;
			},
			resetAuthState: function() {
				SessionProvider.reset('authToken');
				return AUTH_LOGGED_OUT;
			},
			getAccessToken: function() {
				var token = JSON.parse(SessionProvider.getCookie('accessToken'));
				return token;
			},
			setAccessToken: function(token) {
				if (token) {
					var jsonToken = JSON.stringify(token);
					SessionProvider.setCookie('accessToken', jsonToken);
				}
			},
			authorize: function(user, route) {
				var userRole, accessLevel;
				if (user && route.accessLevel) {
					userRole = AuthRouteConfig.userRoles[user.access.role];
					accessLevel = AuthRouteConfig.accessLevels[route.accessLevel];

					if (userRole.bitMask & accessLevel.bitMask) {
						return true;
					}
				} else if (route.accessLevel == 'public' || !route.accessLevel) {
					return true;
				}
				
				return false;
			}
		};
	}])

	/**
	 * [ description]
	 * @param  {[type]} $http
	 * @param  {[type]} AuthProvider
	 * @return {[type]}
	 */
	.factory('AuthHttp', function($http, AuthProvider) {
		return {
			post: function(url, data) {
				data = data || {};
				data.user = AuthProvider.getUser();
				return $http.post(url, data);
			}
		};
	})
	
	/**
	 * [ description]
	 * @param  {[type]} $scope
	 * @param  {[type]} AuthProvider
	 * @param  {[type]} $http
	 * @param  {[type]} $location
	 * @return {[type]}
	 */
	.controller('LoginController', function($scope, AuthProvider, $http, $location) {
		// Set default loginState to pending.
		$scope.loginState = '';
		
		// Check AuthProvider for authentication status, and redirect if user is already logged in.
		if (AuthProvider.getAuthState == AUTH_LOGGED_IN) {
			// TODO: redirect logic.
		}

		$scope.submitLogin = function() {
			var data = $scope.credentials;
			console.log(data);

			$scope.loginState = LOGIN_PENDING;
			

			// Login submission.
			// Attaches credentials object from scope to $http.post() request, which is sent off to login API.
			$http.post('http://localhost:8000/auth/login', data)
				.success(function(data, status) {
					console.log('Login success: ', status, ' - ', data);
					$scope.loginState = LOGIN_SUCCESS;
					// Right now this is messy, because it is inconsistent on the client and server. Sometimes we're dealing with an entire user, and sometimes we're dealing with just an access token.
					// TODO: normalize client and server to pass user object everywhere.
					AuthProvider.setUser(data.user);
					AuthProvider.loginUser();
					$location.url('/');
				})
				.error(function(data, status) {
					console.log('Login error: ', status, ' - ', data);
					$scope.loginState = LOGIN_FAILED;
				});
		};
	})

	/**
	 * [ description]
	 * @param  {[type]} $rootScope
	 * @param  {[type]} $location
	 * @param  {[type]} AuthProvider
	 * @return {[type]}
	 */
	.run(function($rootScope, $location, AuthProvider) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			console.log('$stateChangeStart');
			console.log('accessLevel: ', toState.accessLevel);
			var user = AuthProvider.getUser();
			console.log(user);
			if (!AuthProvider.authorize(user, toState)) {
				$location.url('/login');
			}
		});
	});