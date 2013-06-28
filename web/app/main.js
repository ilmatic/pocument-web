// require(['angular-boot']);

require([
	'angular',
	'app/app',
	'app/router',
	'jquery'
], function(angular, app, router, $) {
	'use strict';
	angular.bootstrap(document, [app['name']]);
	console.log('Main.js is loaded');
});