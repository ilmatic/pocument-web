/** 
 * App.Session - Session module 
 * =================================================================
 * Provides session management service.
 *
 * Is used to retrieve session values from persistence store.
 *
 * TODO: utilize sessionStorage/localStorage instead of?/in addition to cookies.
 * 
*/

angular.module('App.Session', ['ngCookies'])

	/**
	 * @name SessionProvider
	 * @desc Provides methods for cookie management.
	 * 
	 * @dep {ngService} $cookies
	 */
	.factory('SessionProvider', function ($cookies) {

		return {

			/**
			 * @name getCookie
			 * @desc Retrieves cookie from storage.
			 * 
			 * @param  {String} key
			 * @return {String}
			 */
			getCookie: function (key) {
				if (key) return $cookies[key];

				return ''; // TODO: raise an exception if key is not provided.
			},

			/**
			 * @name setCookie
			 * @desc Saves cookie to storage.
			 * 
			 * @param  {String} key
			 * @param  {String} value
			 * @return {String}
			 */
			setCookie: function (key, value)  {
				if (key && value) {
					$cookies[key] = value;
					return $cookies[key];
				}

				return ''; // TODO: raise an exception if key and value are not provided.
			},

			/**
			 * @name resetCookie
			 * @desc Deletes cookie from storage.
			 * 
			 * @param  {String} key
			 * @return {undefined}
			 */
			resetCookie: function (key) {
				if (key) delete $cookies[key];

				return $cookies[key]; // TODO: raise an exception if key is not provided.
			}

		};
	});