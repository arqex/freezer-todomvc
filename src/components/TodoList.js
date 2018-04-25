import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
	render(){
 		var todoItems = [],
 			filter = this.props.filter
 		;

		this.props.todos.forEach( todo => {
			if( filter == 'all' || filter == 'completed' && todo.model.completed || filter == 'active' && !todo.model.completed ){
				todoItems.push( <TodoItem todo={ todo } key={ todo.model.id }/> );
			}
		});

		return (
			<ul className="todo-list">
				{todoItems}
			</ul>
		);
	}

	shouldComponentUpdate( nextProps ){
		// Thanks to freezer's immutabilty we can check if there
		// has been a change in any todo just comparing the todo
		// object. This will boost our app performance drastically.
		return nextProps.todos != this.props.todos ||
			nextProps.filter != this.props.filter
		;
	}

};

export default TodoList;
