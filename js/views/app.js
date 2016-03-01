// js/views/app.js

var app = app || {};

// AppView is top-level view
app.AppView = Backbone.View.extend({

	el: '.task-manager',

	// template for dues in top row
	dueTemplate: _.template($('#due-template').html()),

	events: {
		'click .add': 'toggleVisible',
		'click .submit': 'createTask'
	},

	initialize: function(){
		this.$name = this.$('#name');
		this.$note = this.$('#note');
		this.$due = this.$('#due');

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

	// toggle the visibility of the data entry form when 'Add Task' button is clicked
	toggleVisible: function(){
		this.$('form').toggleClass('hide');
	},

	// create a model when 'Create' button in the data entry form is clicked
	createTask: function(){
		// to create a task, name, note, and due date must all exist
		if ( !this.$name.val().trim() || !this.$note.val().trim() || !this.$due.val().trim() ) {
			this.clearForm();
			return
		}

		app.Tasks.create(this.newAttributes());

		this.clearForm();

	},

	// get attributes from input and generate an obj for createTask
	newAttributes: function(){
		var due = this.$due.val().trim();
		var length = due.length;
		var result = {
			name: this.$name.val().trim(),
			note: this.$note.val().trim()
		};
		// check the format of date input and make it standard as MM/DD
		if (length === 3) {
			due = '0' + due.slice(0, 2) + '0' + due.slice(2);
		} else if (length === 4) {
			if (due.indexOf('/') === 1) {
				due = '0' + due;
			} else {
				due = due.slice(0,3) + '0' + due.slice(3);
			}
		}
		result.due = due;
		return result;
	},

	clearInput: function(){
		this.$name.val('');
		this.$note.val('');
		this.$due.val('');
	},

	// clear input and hide the form after creating a new model
	clearForm: function(){
		this.clearInput();
		this.toggleVisible();
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
			$('.task-table').append('<tr id="' + task + '"><td>' + task + '</td></tr>');

			self.renderTaskCells(task);
		});
	},

	// given a task's name, generate the table row to display
	renderTaskCells: function(task){

		// find the models with this task
		var models = app.Tasks.filter(function(model){
			return model.get('name') === task;
		});

		var taskDues = []; // dues with this task name
		models.forEach(function(model){
			taskDues.push(model.get('due'));
		});

		// if a due is in the taskDues, render a task cell
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
});