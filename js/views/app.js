// js/views/app.js

var app = app || {};

// AppView is top-level view
app.AppView = Backbone.View.extend({

	el: '.task-manager',

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

	toggleVisible: function(){
		this.$('form').toggleClass('hide');
	},

	createTask: function(){
		// to create a task, name, note, and due date must all exist
		if ( !this.$name.val().trim() || !this.$note.val().trim() || !this.$due.val().trim() ) {
			this.clearForm();
			return
		}

		app.Tasks.create(this.newAttributes());

		this.clearForm();

	},

	newAttributes: function(){
		return {
			name: this.$name.val().trim(),
			note: this.$note.val().trim(),
			due: this.$due.val().trim()
		};
	},

	clearInput: function(){
		this.$name.val('');
		this.$note.val('');
		this.$due.val('');
	},

	clearForm: function(){
		this.clearInput();
		this.toggleVisible();
	},

	renderDues: function(){
		var dues = _.uniq(app.Tasks.pluck('due'));
		this.dues = dues;
		this.numberOfCols = dues.length; // number of columns each row will have (excluding the task name column)
		dues.forEach(function(due){
			this.$('.table-head').append('<th>' + due + '</th>');
		});
	},

	renderTasks: function(){
		var self = this;
		var tasks = _.sortBy(_.uniq(app.Tasks.pluck('name')));
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