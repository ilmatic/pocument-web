/** Global define **/

define([
	'jquery',
	'lodash',
	'backbone',
	'views/authView'
],

function($, _, Backbone, AuthView) {
	'use strict';

	console.log('App.js is loaded');
	window.PocumentApp = {
		name: 'PocumentApp',
		version: '0.0.1',
		authView: new AuthView()
	};

	var app = {
		root: '/'
	};
});