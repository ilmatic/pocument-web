/* Login Module
 * Provides login view/controller.
 * Provides a login service which checks for cached credentials from 
 * a specified service, i.e., cookies or localStorage
 * TODO: will likely rename and refactor into auth module
*/

AUTH_LOGGED_IN = 'AUTH_LOGGED_IN';
AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT';
LOGIN_PENDING = 'LOGIN_PENDING';
LOGIN_FAILED = 'LOGIN_FAILED';
LOGIN_SUCCESS = 'LOGIN_SUCCESS';

angular.module('App.Login', ['App.Session'])
	// Setup routes for login module.
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'login/login.tpl.html',
				controller: 'LoginController'
			})
	}])
	// 
	.factory('AuthProvider', function(SessionProvider) {
		return {
			getAuthState: function() {
				if (SessionProvider.getAuthKey()) {
					return AUTH_LOGGED_IN;
				}
				return AUTH_LOGGED_OUT
			}
		};
	})
	// 
	.controller('LoginController', function($scope, AuthProvider, $http) {
		// Set default loginState to pending.
		$scope.loginState = '';
		
		// Check AuthProvider for authentication status, and redirect if user is already logged in.
		if (AuthProvider.getAuthState == AUTH_LOGGED_IN) {
			// TODO: redirect logic.
		}

		$scope.submitLogin = function() {
			var data = {};
			data.credentials = $scope.credentials;
			console.log(data);

			$scope.loginState = LOGIN_PENDING;
			

			// Login submission.
			// Attaches credentials object from scope to $http.post() request, which is sent off to login API.
			$http.post('http://localhost:8080/auth/login', data)
				.success(function(data, status) {
					console.log('Login success: ', status, ' - ', data);
					$scope.loginState = LOGIN_SUCCESS;
					// sessionProvider.setAuthKey(data.authKey);
				})
				.error(function(data, status) {
					console.log('Login error: ', status, ' - ', data);
					$scope.loginState = LOGIN_FAILED;
				});
		};
	});