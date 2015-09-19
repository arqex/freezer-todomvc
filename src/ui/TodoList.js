var React = require('react'),
	TodoItem = require('./TodoItem')
;

var TodoList = React.createClass({

	render: function() {
 		var todoItems = [],
 			filter = this.props.filter
 		;

		this.props.todos.forEach(function (todo) {
			if( filter == 'all' || filter == 'completed' && todo.model.completed || filter == 'active' && !todo.model.completed ){
				todoItems.push( <TodoItem todo={ todo } key={ todo.model.id }/> );
			}
		}, this);

		return (
			<ul className="todo-list">
				{todoItems}
			</ul>
		);
	},

	shouldComponentUpdate: function( nextProps ){
		// Thanks to freezer's immutabilty we can check if there
		// has been a change in any todo just comparing the todo
		// object. This will boost our app performance drastically.
		return nextProps.todos != this.props.todos ||
			nextProps.filter != this.props.filter
		;
	}

});

module.exports = TodoList;
