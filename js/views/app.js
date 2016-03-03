// js/views/app.js

var app = app || {};

// AppView is top-level view
app.AppView = Backbone.View.extend({

	el: '.task-manager',

	// template for dues in top row
	dueTemplate: _.template($('#due-template').html()),

	taskTemplate: _.template($('#task-template').html()),

	initialize: function(){
		this.renderInputForm();

		this.listenTo(app.Tasks, 'all', this.render);

		app.Tasks.fetch();
	},

	render: function(){
		$('.task-table').html('<tr class="table-head"><th>Tasks</th></tr>');
		if (app.Tasks.length) {
			this.renderDues();
			this.renderTasks();
		}
	},

	// render the first row of due dates in the table
	renderDues: function(){
		var self = this;
		this.dues = _.uniq(app.Tasks.pluck('due')); // get all due dates from collection
		this.dues.forEach(function(due){
			$('.table-head').append(self.dueTemplate({due: due}));
		});
	},

	// render a row for each task name
	renderTasks: function(){
		var self = this;
		var tasks = _.sortBy(_.uniq(app.Tasks.pluck('name'))); // get all task names
		tasks.forEach(function(task){
			// render task name
			$('.task-table').append(self.taskTemplate({task: task}));

			self.renderTaskCells(task);
		});
	},

	// render all <td>s in a row following a task name
	renderTaskCells: function(task){

		// find the models with this task
		var models = app.Tasks.filter(function(model){
			return model.get('name') === task;
		});

		var taskDues = []; // dues with this task name
		models.forEach(function(model){
			taskDues.push(model.get('due'));
		});

		// if a due is in the taskDues, render a task cell, otherwise render a blank <td>
		this.dues.forEach(function(due){
			var pos = $.inArray(due, taskDues);
			if (pos !== -1) {
				var view = new app.TaskView({model: models[pos]});
				$('#' + task).append(view.render().el);
			} else {
				$('#' + task).append('<td></td>');
			}
		});
	},

	// render the input form section where users can input new tasks
	renderInputForm: function() {
		var view = new app.FormView();
		$('.task-manager').append(view.render().el);
	}
});