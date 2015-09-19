var React = require('react');
var TodoApp = require('./ui/App');

// Include the the reactions in order
// to respond to the state changes.
require('./todoReactions');

React.render(
	<TodoApp />,
	document.getElementById('root')
);
