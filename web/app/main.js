// require(['angular-boot']);

require([
	'angular',
	'app/app',
	'app/router',
	'jquery'
], function(angular, app, router, $) {
	'use strict';
	// app.config(['$httpProvider', function($httpProvider) {
	// 	$httpProvider.defaults.useXDomain = true;
	// 	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	// }]);
	angular.bootstrap(document, [app['name']]);
	console.log('Main.js is loaded');
});