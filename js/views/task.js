// js/views/task.js

var app = app || {};

// TaskView is view for a single model
app.TaskView = Backbone.View.extend({
	tagName: 'tr',

	events: {
		'click .destroy': 'removeOne'
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	// re-render when model changes
	render: function(){
		this.$el.html(this.model.get('name') + '<button class="destroy"></button>');
		return this;
	},

	removeOne: function(e){
		var $td = $(e.target).parent();

	}
});