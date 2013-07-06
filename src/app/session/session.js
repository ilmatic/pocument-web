// Session module
angular.module('App.Session', ['ngCookies'])
	// Session provider. Is used to retrieve session values stored with cookies. 
	// TODO: change this to use sessionStorage/localStorage instead of cookies.
	.factory('SessionProvider', function($cookies) {
		// Set defaults.
		return {
			getCookie: function(key) {
				if (key) return $cookies[key];
			},
			setCookie: function(key, value)  {
				if (key && value) {
					$cookies[key] = value;
					return value;
				}
			},
			reset: function(key) {
				if (key) $cookies[key] = '';
			}
		};
	});