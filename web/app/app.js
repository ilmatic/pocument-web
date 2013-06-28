/** Global define **/

define([
	'jquery',
	'angular',
	'app/controllers'
],

function($, angular, controllers) {
	'use strict';
	console.log('App.js is loaded');
	return angular.module('PocumentApp', ['PocumentApp.controllers']);
});