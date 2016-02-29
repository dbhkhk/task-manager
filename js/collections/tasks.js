// js/collections/tasks.js

var app = app || {};

// TaskList collection
var TaskList = Backbone.Collection.extend({

	model: app.Task,

	localStorage: new Backbone.LocalStorage('task-manager'),

	comparator: 'due' // keep the collection in sorted order by due dates

});

// create collection for app
app.Tasks = new TaskList();