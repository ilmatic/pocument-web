/** Global define **/

define([
	'jquery',
	'lodash',
	'backbone',
	'views/authView',
	'views/settingsView',
	'views/loginView',
	'app/router'
],

function($, _, Backbone, AuthView, SettingsView, LoginView, AppRouter) {
	'use strict';

	function PocumentApp() {
		this.name = 'PocumentApp';
		this.version = '0.0.1';
		this.authView = new AuthView();
		this.settingsView = new SettingsView();
		this.loginView = new LoginView();
		this.authView.render();
		this.router = new AppRouter();
		Backbone.history.start();
	};

	PocumentApp.prototype = {

	};

	console.log('App.js is loaded');

	return PocumentApp;
});