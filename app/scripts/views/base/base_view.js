define(['jquery', 'lodash', 'handlebars.runtime', 'backbone', 'helpers/handlebars_helpers'],
	function($, _, Handlebars, Backbone, HandlebarsHelpers) {
	"use strict";
	var View = Backbone.View.extend({

		initialize: function(options) {
			this.mergeBaseProperties(this, this);

			Handlebars = Handlebars['default'];
			Handlebars.partials = Handlebars.templates;
			
			HandlebarsHelpers.register(this, Handlebars);	

			this.childViews = [];
			this.keypressEvents = [];
		},
		
		handlebarsHelpers: [],
		mergeProperties: [ 'events', 'handlebarsHelpers' ],

		initializeBaseClass: function(baseClass, args, extras) {
			if (extras)
				this.addMergeProperties(extras);

			this.mergeBaseProperties(baseClass, this);
			baseClass.initialize.apply(this, args);
		},

		addMergeProperties: function(mergeProperties) {
			this.mergeArraysUnique(this.mergeProperties, mergeProperties);
		},

		mergeBaseProperties: function(baseClass, superClass) {
			for (var x = 0; x < superClass.mergeProperties.length; x++) {
				var key = superClass.mergeProperties[x];
				var value = superClass[key];
				if (_.isString(value)) {
					if (typeof value === 'undefined') {
						this[key] = value;
					}
				} else if (_.isArray(value)) {
					if (!baseClass[key]) {
						baseClass[key] = [];
					}
					this[key] = this.mergeArraysUnique(baseClass[key], value);
				} else if (_.isObject(value)) {
					if (!baseClass[key]) {
						baseClass[key] = {};
					}
					var newObj = {};
					$.extend(true, newObj, value);
					$.extend(true, newObj, baseClass[key]);
					this[key] = newObj;
				}
			}
		},

		mergeArraysUnique: function(firstArray, secondArray) {
			var uniqueObj = {};
			for (var x = 0; x < firstArray.length; x++) {
				uniqueObj[firstArray[x]] = 1;
			}
			for (var y = 0; y < secondArray.length; y++) {
				uniqueObj[secondArray[y]] = 1;
			}
			return Object.keys(uniqueObj);
		},

		destroy: function() {
			if (typeof this.keypressEvents !== 'undefined') {
				for (var i = 0; i < this.keypressEvents.length; i++) {
					this.keypressEvents[i].destroy();
				}
				this.keypressEvents.length = 0;
			}
			
			if (typeof this.deregisterGlobalEvents !== 'undefined') {
				this.deregisterGlobalEvents();
			}
			
			for (var x = 0; x < this.childViews.length; x++) {
				this.childViews[x].destroy();
			}

			this.undelegateEvents();
			this.$el.removeData().unbind();
			this.remove();
		}
	});
	
	return View;
});