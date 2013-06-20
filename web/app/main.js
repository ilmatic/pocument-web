require([
	'app/app',
	'backbone',
	'jquery'
],

function(PocumentApp, Backbone, $) {
	'use strict';
	console.log('Main.js is loaded');
	window.app = new PocumentApp();
});