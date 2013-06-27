define([
	'jquery', 
	'backbone',
	'handlebars',
	'text!templates/login.html'
], function($, Backbone, Handlebars, loginTpl) {
	var LoginView = Backbone.View.extend({
		el: '#container',

		// Cache the template function.
		template: Handlebars.compile(loginTpl),

		render: function() {
			this.$el.html(this.template({}));
		}
	});

	return LoginView;
});