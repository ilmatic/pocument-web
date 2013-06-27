define([
	'backbone'
], function(Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'settings': 'settings',
			'login': 'login'
		},

		settings: function() {
			console.log('Settings page');
			window.app.settingsView.render();
		},

		login: function() {
			console.log('Login page');
			window.app.loginView.render();
		}
	});

	return AppRouter;
});