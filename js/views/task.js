// js/views/task.js

var app = app || {};

// TaskView is view for a single model
app.TaskView = Backbone.View.extend({
	tagName: 'td',

	events: {
		'click .destroy': 'clear'
	},

	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		this.$el.html(this.model.get('note') + '<button class="destroy"></button>');
		return this;
	},

	clear: function(){
		this.model.destroy();
	}
});