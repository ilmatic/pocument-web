define([
	'jquery',
	'backbone',
	'handlebars',
	'text!templates/settings.html'
], function($, Backbone, Handlebars, settingsTpl) {
	var SettingsView = Backbone.View.extend({
		el: '#container',

		// Cache the template function.
		template: Handlebars.compile(settingsTpl),

		// Set #container html() to contents of this.template
		render: function() {
			this.$el.html(this.template({}));
			return this;
		},

		events: {
			'click button': 'getAuthUrl'
		},

		getAuthUrl: function(event) {
			$.get('http://localhost:4711/gapi/authUrl', function(data) {
				// $('#authUrl').text(data.url);
				if (data.url) window.location = data.url;
			});
		}
	});

	return SettingsView;
});