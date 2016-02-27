// js/views/app.js

var app = app || {};

// AppView is top-level view
app.AppView = Backbone.View.extend({

	el: '.app',

	events: {
		'click .add': 'toggleVisible',
		'click .submit': 'createTask'
	},

	initialize: function(){
		this.$name = this.$('#name');
		this.$note = this.$('#note');
		this.$due = this.$('#due');

		this.listenTo(app.Tasks, 'add', this.addOne);
		this.listenTo(app.Tasks, 'all', this.render);

		app.Tasks.fetch();
	},

	// re-render means refreshing the table head
	render: function(){
		this.$('.table-head').html('<th>Tasks</th>');
		if (app.Tasks.length) {
			this.renderDues();
			//this.renderTasks();
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

	// renderTasks: function(){
	// 	var self = this;
	// 	var tasks = _.sortBy(_.uniq(app.Tasks.pluck('name')));
	// 	tasks.forEach(function(task){
	// 		self.$('.task-table').append(self.newTaskRow(task));
	// 	});
	// },

	addOne: function(task){
		var view = new app.TaskView({model: task});
		$('.task-table').append(view.render().el);
	}

	// given a task's name, generate the table row to display
	/*newTaskRow: function(task){

		// find the models with this task
		var models = app.Tasks.filter(function(model){
			return model.get('name') === task;
		});

		var taskDues = []; // dues with this task name
		models.forEach(function(model){
			taskDues.push(model.get('due'));
		});

		var content = '<tr><td>' + task + '</td>';

		// if a due is in the taskDues, add a column to display
		this.dues.forEach(function(due){
			var pos = $.inArray(due, taskDues);
			if (pos !== -1) {
				content += '<td>' + models[pos].get('note') + '<button class="destroy"></button></td>';
			} else {
				content += '<td></td>';
			}
		});

		content += '</tr>';
		return content;
	},*/
});