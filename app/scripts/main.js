require.config({
	paths: {
		'jquery': 'vendor/jquery/dist/jquery',
		'jquery-ui': 'vendor/jquery-ui/ui/',
		'lodash': 'vendor/lodash/lodash',
		'backbone': 'vendor/backbone/backbone',
		'handlebars.runtime': 'vendor/handlebars/handlebars.runtime.amd.min',
		'bootstrap': 'vendor/bootstrap/js',
		'moment': 'vendor/moment/moment',
		'templates': 'templates',
		'keypress': 'vendor/Keypress/keypress',
		'slider': 'vendor/jquery-nstSlider/dist/jquery.nstSlider',
		'bowser': 'vendor/bowser/bowser',
		'helperss': 'custom/helpers',
	},
	'map': {
		'*': {
			'underscore': 'lodash'
		}
	}
});

require(['jquery', 'backbone', 'router', 'bowser', 'templates'],
	function($, Backbone, Router, Bowser, Templates) {

	"use strict";
	$.ajaxSetup({cache: false});
	new Router();
	Backbone.history.start();
});