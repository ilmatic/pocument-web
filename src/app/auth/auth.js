/** 
 * App.Auth - Authentication module 
 * =================================================================
 * Provides login view/controller.
 * 
 * Provides a login service which checks for cached credentials from 
 * a specified service, i.e., cookies or localStorage
 * 
*/

var AUTH_LOGGED_IN = 'AUTH_LOGGED_IN';
var AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT';
var LOGIN_PENDING = 'LOGIN_PENDING';
var LOGIN_FAILED = 'LOGIN_FAILED';
var LOGIN_SUCCESS = 'LOGIN_SUCCESS';

angular.module('App.Auth', ['App.Session'])
	

	/**
	 * @desc Setup states for App.Auth module.
	 * @dep {ngProvider} $stateProvider
	 */
	.config(['$stateProvider', function ($stateProvider) {
		'use strict';
		$stateProvider
			.state('root.login', {
				url: '/login',
				templateUrl: 'auth/login.tpl.html',
				controller: 'LoginController',
				accessLevel: 'public'
			});
	}])

	/**
	 * @name AuthRouteConfig
	 * @desc Configuration object App.Auth state authenticator.
	 */
	.factory('AuthRouteConfig', function AuthRouteConfig () {
		'use strict';
		var config = {
			
			/**
			 * List all the roles used in the app.
			 * Maximum of 31 before bit shift pushes accompanying integer out of memory footprint.
			 * 
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
			 * 
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
		 * Accepts a array of user roles (strings) and iterates through it.
		 * On each iteration, peforms a bit shift and pushes userRole object
		 * to results, with bitMask and title.
		 * 
		 * @param  {Array} roles
		 * @return {Object}
		 */
		function buildRoles (roles) {
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
		 * Accepts accessLevelDeclarations and userRoles objects, and returns
		 * an accessLevels object with each accessLevel holding a bitMask for
		 * running bitwise operations against userRoles with.
		 * 
		 * @param  {Object} accessLevelDeclarations
		 * @param  {Object} userRoles
		 * @return {Object}
		 */
		function buildAccessLevels (accessLevelDeclarations, userRoles) {
			var accessLevels = {},
				resultBitMask;

			for (var level in accessLevelDeclarations) {
				if (typeof accessLevelDeclarations[level] == 'string') {
					if (accessLevelDeclarations[level] == '*') {
						resultBitMask = '';

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
					resultBitMask = 0;
					for (var userRole in accessLevelDeclarations[level]) {
						if (userRoles.hasOwnProperty(accessLevelDeclarations[level][userRole])) {
							resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][userRole]].bitMask;
						} else {
							console.log('Access Control Error: Could not find role "' + accessLevelDeclarations[level][userRole] + '" in registered roles while building access for "' + level + '".');
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
	 * @name AuthProvider
	 * @desc Provides methods for managing authentication app-wide
	 * 
	 * @dep {ngProvider} SessionProvider
	 * @dep {ngService} AuthRouteConfig
	 * @dep {ngScope} $rootScope
	 */
	.factory('AuthProvider', ['SessionProvider', 'AuthRouteConfig', '$rootScope', function (SessionProvider, AuthRouteConfig, $rootScope) {
		'use strict';
		return {
			/**
			 * @name loginUser
			 * @desc Logs in user and broadcasts login events.
			 */
			loginUser: function () {
				$rootScope.$broadcast('userWillLogin');

				$rootScope.$broadcast('userDidLogin');
			},

			/**
			 * @name logoutUser
			 * @desc Logs out user and broadcasts logout events.
			 */
			logoutUser: function () {
				$rootScope.$broadcast('userWillLogout');
				SessionProvider.resetCookie('user');
				$rootScope.$broadcast('userDidLogout');
			},

			/**
			 * @name getUser
			 * @desc Retrieves user object from persistence store.
			 * 
			 * @return {Object | ''}
			 */
			getUser: function () {
				var user = SessionProvider.getCookie('user');
				console.log('AuthProvider.getUser: ', user);
				return user ? JSON.parse(user) : user;
			},

			/**
			 * @name setUser
			 * @desc Saves user object in persistence store.
			 * 
			 * @param  {Object} user
			 */
			setUser: function (user) {
				var jsonUser = JSON.stringify(user);
				console.log('AuthProvider.setUser: ', jsonUser);
				SessionProvider.setCookie('user', jsonUser);
			},

			/**
			 * @name getAccessLevel
			 * @desc Retrieves access level object from persistence store.
			 * @return {Object}
			 */
			getAccessLevel: function () {

			},

			/**
			 * -- DEPRECATED --
			 * @name getAuthState
			 * @desc Attempts to retrieve access token from persistence store, then returns auth status(String).
			 * 
			 * @return {[type]}
			 */
			getAuthState: function () {
				if (SessionProvider.getCookie('authToken')) {
					return AUTH_LOGGED_IN;
				}
				return AUTH_LOGGED_OUT;
			},

			/**
			 * -- DEPRECATED --
			 * @name resetAuthState
			 * 
			 * @return {[type]}
			 */
			resetAuthState: function () {
				SessionProvider.reset('authToken');
				return AUTH_LOGGED_OUT;
			},

			/**
			 * @name getAccessToken
			 * @desc Retrieves access token from persistence store.
			 * 
			 * @return {[type]}
			 */
			getAccessToken: function () {
				var token = JSON.parse(SessionProvider.getCookie('accessToken'));
				return token;
			},

			/**
			 * @name setAccessToken
			 * @desc Saves access token in persistence store.
			 * 
			 * @param  {String} token
			 */
			setAccessToken: function (token) {
				if (token) {
					var jsonToken = JSON.stringify(token);
					SessionProvider.setCookie('accessToken', jsonToken);
				}
			},

			/**
			 * @name authorize
			 * @desc Determines if user role is authorized to access a route.
			 * 
			 * Accepts a user object and a route object, performs a bitwise comparison
			 * of their bitMasks, then returns true if user is authorized, and false 
			 * if not.
			 * 
			 * @param  {Object} user
			 * @param  {Object} route
			 * @return {Boolean}
			 */
			authorize: function (user, route) {
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
	 * @name AuthHttp
	 * @desc Wraps $http service for making authenticated requests to Pocument API.
	 *
	 * Right now it just appends a user object with accessToken to the request
	 * TODO: might come up with a more sophisticated/lightweight way of managing this.
	 * 
	 * @dep {ngService} $http
	 * @dep {ngProvider} AuthProvider
	 */
	.factory('AuthHttp', function ($http, AuthProvider) {
		'use strict';

		return {
			post: function (url, data) {
				data = data || {};
				data.user = AuthProvider.getUser();
				return $http.post(url, data);
			}
		};
	})
	
	/**
	 * @name LoginController
	 * @dep {ngScope} $scope
	 * @dep {ngProvider} AuthProvider
	 * @dep {ngService} $http
	 * @dep {ngService} $location
	 */
	.controller('LoginController', function ($scope, AuthProvider, $http, $location) {
		'use strict';

		// Set default loginState to pending.
		$scope.loginState = '';
		
		// Check AuthProvider for authentication status, and redirect if user is already logged in.
		if (AuthProvider.getAuthState == AUTH_LOGGED_IN) {
			/**
			 * TODO: Redirect logic. Should getUser from AuthProvider and redirect user
			 * to root if already logged in.
			 */
		}

		$scope.submitLogin = function () {
			var data = { credentials: $scope.credentials };
			console.log(data);

			$scope.loginState = LOGIN_PENDING;
			
			/**
			 * Login submission.
			 * Attaches credentials (username/password) object from scope to $http.post() request, which is sent off to login API.
			 */
			$http.post('http://localhost:8000/auth/login', data)
				/**
				 * Login success
				 * If login is successful, store user in persistence and redirect
				 * to root.
				 * 
				 * @param  {Object} data
				 * @param  {Number} status
				 */
				.success(function (data, status) {
					console.log('Login success: ', status, ' - ', data);
					$scope.loginState = LOGIN_SUCCESS;

					/**
					 * Right now this is messy, because it is inconsistent on the client and server. Sometimes we're dealing with
					 * and entire user, and other times it's just an access token.
					 * TODO: Refactor client and server behavior to pass normalized user object.
					 */
					
					AuthProvider.setUser(data.user);
					AuthProvider.loginUser();
					$location.url('/');
				})

				/**
				 * Login failure
				 * If login fails, notify the user and remain on login page.
				 * 
				 * @param  {Object} data
				 * @param  {Number} status
				 */
				.error(function (data, status) {
					console.log('Login error: ', status, ' - ', data);
					$scope.loginState = LOGIN_FAILED;
				});
		};
	})

	/**
	 * Post-configuration execution code.
	 * Set listener on stateChangeStart authorize user for that state
	 * 
	 * @dep {ngScope} $rootScope
	 * @dep {ngService} $location
	 * @dep {ngProvider} AuthProvider
	 */
	.run(function ($rootScope, $location, AuthProvider) {
		'use strict';

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			console.log('$stateChangeStart');
			console.log('accessLevel: ', toState.accessLevel);
			var user = AuthProvider.getUser();
			console.log(user);
			if (!AuthProvider.authorize(user, toState)) {
				$location.url('/login');
			}
		});
	});