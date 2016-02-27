// js/collections/tasks.js

var app = app || {};

// TaskList collection
var TaskList = Backbone.Collection.extend({

	model: app.Task,

	localStorage: new Backbone.LocalStorage('task-manager'),

	comparator: 'due'

});

app.Tasks = new TaskList();