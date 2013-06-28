define([
	'app/app'
], function(app) {
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/home', {templateUrl: 'templates/root.html', controller: 'RootController'})
			.when('/settings', {templateUrl: 'templates/settings.html', controller: 'SettingsController'})
			.otherwise({redirectTo: '/home'});
	}]);
});


// define([
// 	'backbone'
// ], function(Backbone) {
// 	var AppRouter = Backbone.Router.extend({
// 		routes: {
// 			'settings': 'settings',
// 			'login': 'login'
// 		},

// 		settings: function() {
// 			console.log('Settings page');
// 			window.app.settingsView.render();
// 		},

// 		login: function() {
// 			console.log('Login page');
// 			window.app.loginView.render();
// 		}
// 	});

// 	return AppRouter;
// });