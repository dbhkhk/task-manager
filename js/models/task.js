// js/models/task.js

var app = app || {};

// Task model
app.Task = Backbone.Model.extend({

	defaults: {
		name: '',
		note: '',
		due:''
	}

});