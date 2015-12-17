define(['jquery', 'lodash', 'backbone'],
	function($, _, Backbone) {
		"use strict";
		return Backbone.Router.extend({
			routes: {
				'': 'index',
				'*notFound': 'default_redirect'
			},

			view: null,

			default_redirect: function() {
				location.href = '/';
			},

			index: function() {
				var self = this;
				if (this.view !== null)
					this.view.destroy();
				require(['views/naruto'], function(AppView) {
					self.view = new AppView();
				});
			}
		});
});
