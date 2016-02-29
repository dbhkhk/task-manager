// js/views/task.js

var app = app || {};

// TaskView is view for a single model
app.TaskView = Backbone.View.extend({
	tagName: 'td', // create a <td> element for each model to render in the table

	events: {
		'click .destroy': 'clear'
	},

	initialize: function(){
		// 'model' attribute will be passed in when a TodoView is created
		// remove the view and its el from the DOM, also stop all listening
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		this.$el.html(this.model.get('note') + '<button class="destroy"></button>');
		return this;
	},

	// destroy the model on server
	clear: function(){
		this.model.destroy();
	}
});