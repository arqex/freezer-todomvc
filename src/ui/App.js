var React = require('react'),
	TodoFooter = require('./Footer'),
	TodoList = require('./TodoList'),
	State = require('../state')
;

var ENTER_KEY = 13;

var TodoApp = React.createClass({

	componentDidMount: function () {
		var me = this;

		// Here the magic happens. Everytime that the
		// state is updated the app will re-render.
		// A real data driven app.
		State.on('update', function(){
			me.forceUpdate();
		});
	},

	handleNewTodoKeyDown: function (event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();
		State.trigger('todo:create', State.get().todoInput.trim() );
	},

	updateTodoInput: function( e ){
		// Update inputs needs to be done synchronously,
		// so we use the now method.
		// We don't need to use a reaction for this.
		State.get().set({ todoInput: e.target.value }).now();
	},

	render: function () {
		var state = State.get(),
			todos = state.todos,
			activeCount = 0,
			completedCount = 0,
			headerClass = 'header ' + state.status,
			main = '',
			footer = ''
		;

		// Let's count todos
		todos.forEach(function (todo) {
			if( !todo.model.completed )
				activeCount++;
			else
				completedCount++;
		}, this);

		if( todos.length ){
			footer = (
				<TodoFooter
					count={activeCount}
					completedCount={completedCount}
					nowShowing={ state.filter } />
			);

			main = (
				<section className="main">
					<TodoList todos={ todos } filter={ state.filter } />
				</section>
			);
		}

		return (
			<div>
				<header className={ headerClass }>
					<h1>todos</h1>
					<input className="new-todo"
						ref="newField"
						value={ state.todoInput }
						onChange={ this.updateTodoInput }
						placeholder="What needs to be done?"
						onKeyDown={this.handleNewTodoKeyDown}
						autoFocus={true} />
					<span className="loadingMessage">Saving...</span>
				</header>
				{main}
				{footer}
			</div>
		);
	}
});

module.exports = TodoApp;
