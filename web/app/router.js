define([
	'backbone'
], function(Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'settings': 'settings'
		},

		settings: function() {
			console.log('Settings page');
			window.app.settingsView.render();
		}
	});

	return AppRouter;
});