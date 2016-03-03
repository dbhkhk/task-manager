// js/views/form.js

var app = app || {};

// FormView is view for the user input form
app.FormView = Backbone.View.extend({
	tagName: 'div',

	inputFormTemplate: _.template($('#input-form-template').html()),

	events: {
		'click .add': 'toggleVisible',
		'click .submit': 'createTask'
	},

	initialize: function(){
		this.$name = this.$('#name');
		this.$note = this.$('#note');
		this.$due = this.$('#due');
		this.$form = this.$('form');
	},

	render: function(){
		this.$el.html(this.inputFormTemplate());
		return this;
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
	// toggle the visibility of the data entry form when 'Add Task' button is clicked
	toggleVisible: function(){
		this.$form.toggleClass('hide');
	},

	// clear input and hide the form after creating a new model
	clearForm: function(){
		this.clearInput();
		this.toggleVisible();
	},

	clearInput: function(){
		this.$name.val('');
		this.$note.val('');
		this.$due.val('');
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
	}
});