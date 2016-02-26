// js/views/app.js

var app = app || {};

// AppView is top-level view
app.AppView = Backbone.View.extend({

	el: '.app',

	headTemplate: _.template( $('#th-template').html() ),

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
			this.renderDues();
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
		var dues = app.Tasks.pluck('due');
		this.$('.table-head').append(this.headTemplate({
			due: due
		}));
	}

});