import React from 'react';
import store from '../state/store';

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

export default class TodoItem extends React.Component {
	constructor( props ){
		super( props );
		this.state = {
			editText: props.todo.title
		};
	}

	handleUpdate(){
		var todo = this.props.todo;
		store.emit('todo:update', todo, todo.ui.input );
	}

	handleEdit () {
		this.props.todo.ui.set({status: 'editing'});
	}

	handleKeyDown (event) {
		if (event.which === ESCAPE_KEY) {
			todo.ui.set({status: 'ready'});
		} else if (event.which === ENTER_KEY) {
			this.handleUpdate();
		}
	}

	handleChange (event) {
		this.props.todo.ui.set({ input: event.target.value }).now();
	}

	/**
	 * Safely manipulate the DOM after updating the state when invoking
	 * `this.props.onEdit()` in the `handleEdit` method above.
	 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
	 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	 */
	componentDidUpdate (prevProps) {
		var status = this.props.todo.ui.status;
		if (prevProps.todo.ui.status != status && status == 'editing') {
			var node = React.findDOMNode(this.refs.editField);
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}
	}

	render () {
		var todo = this.props.todo,
			className = todo.ui.status,
			content = ''
		;

		if( todo.model.completed )
			className += ' completed';

		if( ['editing', 'updating'].indexOf( todo.ui.status ) != -1 ){
			content = (
				<div className="editingTodo">
					<input
						ref="editField"
						className="edit"
						value={ todo.ui.input }
						onBlur={this.handleUpdate}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown} />
					<span className="loadingMessage">Saving...</span>
				</div>
			);
		}
		else {
			content = (
				<div className="view">
					<input className="toggle"
						type="checkbox"
						checked={ todo.model.completed }
						onChange={ () => store.emit( 'todo:toggle', this.props.todo ) } />
					<label onDoubleClick={this.handleEdit}>
						{ todo.model.title }
					</label>
					<button className="destroy" onClick={ () => store.emit( 'todo:delete', this.props.todo ) } />
					<span className="loadingMessage">Deleting...</span>
				</div>
			)
		}

		return (
			<li className={ className }>
				{ content }
			</li>
		);
	}
};
