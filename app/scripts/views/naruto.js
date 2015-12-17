define(['jquery', 'lodash', 'backbone', 'views/base/base_view', 'templates'],
	function($, _, Backbone, BaseView, Templates) {
	"use strict";
	var App = BaseView.extend({
		el: '#naruto',

		events: {},

		initialize: function() {
			this.initializeBaseClass(BaseView.prototype, arguments);
			this.render();
		},

		render: function() {
			var self = this;
			var narutoVolumes = [];
			$.ajax({
				url: '/session/naruto'
			}).success(function(response) {
				var volumes = $(response).find("#listing tr");
				for (var v = 1; v < volumes.length; v++) {
					var newVolume = {
						Title: $(volumes[v]).find("td")[0].innerText,
						Link: $(volumes[v]).find("td a")[0].href
					};
					narutoVolumes.push(newVolume);
				}
				self.$el.html(Templates.naruto({narutoVolumes: narutoVolumes}));
			});
		}
	});

	return App;
});