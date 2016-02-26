// js/views/app.js

var app = app || {};

// AppView is top-level view
app.AppView = Backbone.View.extend({

	el: '.app',

	events: {
		'click button': 'toggleVisible',
		'click .submit': 'createTask'
	},

	initialize: function(){
		this.$name = this.$('#name');
		this.$note = this.$('#note');
		this.$due = this.$('#due');

		this.listenTo(app.Tasks, 'add', this.addOne);
		this.listenTo(app.Tasks, 'reset', this.addAll);
		this.listenTo(app.Tasks, 'all', this.render);

		app.Tasks.fetch();
	},

	render: function(){
		if (app.Tasks.length) {
			this.$('table').html('<tr class="table-head"><th>Task List</th></tr>');
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
		var dues = _.sortBy(_.uniq(app.Tasks.pluck('due')));
		dues.forEach(function(due){
			this.$('.table-head').append('<th>' + due + '</th>');
		});
	},

	renderTasks: function(){
		var tasks = _.sortBy(_.uniq(app.Tasks.pluck('name')));
		tasks.forEach(function(task){
			this.$('table').append('<tr id="' + task + '"><td>' + task + '</td></tr>')
		});
	}

});