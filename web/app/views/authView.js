define([
	'jquery',
	'lodash',
	'backbone',
	'handlebars',
	'text!templates/auth.html'
], function($, _, Backbone, Handlebars, authTpl) {
	var AuthView = Backbone.View.extend({
		el: '#container',

		// Cache the template function.
		template: Handlebars.compile(authTpl),

		render: function() {
			this.$el.html(this.template({}));
			return this;
		}
	});

	return AuthView;
});