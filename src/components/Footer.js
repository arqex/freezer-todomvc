import React from 'react';
import Utils from '../state/utils';
import store from '../state/store';

export default class Footer extends React.Component {
	handleClearCompleted(){
		store.emit('todo:clearCompleted');
	}

	handleFilter( filter ){
		return function( e ){
			e.preventDefault();
			store.emit('todo:filter', filter);
		};
	}

	render () {
		var activeTodoWord = Utils.pluralize(this.props.count, 'item'),
			nowShowing = this.props.nowShowing,
			clearButton = null,
			allClass = nowShowing == 'all' ? 'selected' : '',
			activeClass = nowShowing == 'active' ? 'selected' : '',
			completedClass = nowShowing == 'completed' ? 'selected' : ''
		;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button className="clear-completed"	onClick={ this.handleClearCompleted }>
					Clear completed
				</button>
			);
		}

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.count}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					<li>
						<a	href="#"	className={ allClass } onClick={ this.handleFilter('all') }>All</a>
					</li>
					{' '}
					<li>
						<a	href="#"	className={ activeClass } onClick={ this.handleFilter('active') }>Active</a>
					</li>
					{' '}
					<li>
						<a	href="#"	className={ completedClass } onClick={ this.handleFilter('completed') }>Completed</a>
					</li>
				</ul>
				{clearButton}
			</footer>
		);
	}
};
