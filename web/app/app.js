var App = window.App = angular.module('App', [
	'App.Controllers'
]).config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {templateUrl: 'views/root.html', controller: 'RootController'})
		.when('/settings', {templateUrl: 'views/settings.html', controller: 'SettingsController'})
		.otherwise({redirectTo: '/home'});
}]);