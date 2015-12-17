define(['lodash', 'moment'],
	function(_, Moment) {
	"use strict";
	return {
		register: function(view, handlebars) {
			var self = this;
			if (typeof view.handlebarsHelpers !== 'undefined') {
				_.each(view.handlebarsHelpers, function(value) {
					self[value](handlebars);
				});
			}
		},
		iter: function(handlebars) {
			handlebars.registerHelper('iter', function(context, options) {
			  var ret = "";

			  for(var i=0; i<Number(context); i++) {
			    ret = ret + options.fn();
			  }

			  return ret;
			});
		},
		prettifyDate: function(handlebars) {
			handlebars.registerHelper("prettifyDate", function(isoFormatDateString) {
				var d = new Date(isoFormatDateString.fn(this));
				if (Moment(d).isValid()) {
					var utc = Moment.utc(isoFormatDateString.fn(this));
					return utc.local().calendar().toLowerCase();
				}
				else {
					return isoFormatDateString.fn(this);
				}
			});
		},
		prettifyDateTime: function(handlebars) {
			handlebars.registerHelper("prettifyDateTime", function(isoFormatDateString) {
				var d = new Date(isoFormatDateString.fn(this));
				if (Moment(d).isValid()) {
					var utc = Moment.utc(isoFormatDateString.fn(this));
					return utc.local().format('M/DD/YYYY h:mm A');
				}
				else {
					return isoFormatDateString.fn(this);
				}
			});
		},
		parseRatingJSON: function(handlebars) {
			handlebars.registerHelper("parseRatingJSON", function (options) {
				var obj = JSON.parse(options.hash.Bean);
				obj.Bean.Rating = options.hash.Rating;
				return options.fn(obj);
			});
		},
		first: function(handlebars) {
			handlebars.registerHelper("first", function(limit, collection, options) {
				var ret = '';
                var objects = _.slice(collection, 0, limit);
                _.each(objects, function (obj) {
                    ret = ret + options.fn(obj);
                });
                return ret;
			});
		},
		remaining: function(handlebars) {
			handlebars.registerHelper("remaining", function(collection, limit, options) {
				var ret = '';
                var objects = _.slice(collection, limit);
                _.each(objects, function (obj) {
                    ret = ret + options.fn(obj);
                });
                return ret;
			});
		},
		ifCond: function(handlebars) {
			handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
			    switch (operator) {
			        case '==':
			            return (v1 == v2) ? options.fn(this) : options.inverse(this);
			        case '===':
			            return (v1 === v2) ? options.fn(this) : options.inverse(this);
			        case '!=':
			            return (v1 != v2) ? options.fn(this) : options.inverse(this);
			        case '<':
			            return (v1 < v2) ? options.fn(this) : options.inverse(this);
			        case '<=':
			            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			        case '>':
			            return (v1 > v2) ? options.fn(this) : options.inverse(this);
			        case '>=':
			            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			        case '&&':
			            return (v1 && v2) ? options.fn(this) : options.inverse(this);
			        case '||':
			            return (v1 || v2) ? options.fn(this) : options.inverse(this);
			        default:
			            return options.inverse(this);
			    }
			});
		}
	};
});
