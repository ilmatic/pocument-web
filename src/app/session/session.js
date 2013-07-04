// Session module
angular.module('App.Session', ['ngCookies'])
	// Session provider. Is used to retrieve session values stored with cookies. 
	// TODO: change this to use sessionStorage/localStorage instead of cookies.
	.factory('SessionProvider', function($cookies) {
		// Set defaults.
		$cookies.authKey = '';

		return {
			getAuthKey: function() {
				return $cookies.authKey;
			},
			setAuthKey: function(value) {
				$cookies.authKey = value;
			},
			reset: function() {
				$cookies.authKey = '';
			}
		};
	});