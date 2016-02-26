// js/collections/tasks.js

var app = app || {};

// TaskList collection
var TaskList = Backbone.Collection.extend({

	model: app.Task,

	localStorage: new Backbone.LocalStorage('task-manager')

});

app.Tasks = new TaskList();