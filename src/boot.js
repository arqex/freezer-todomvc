var React = require('react');
var TodoApp = require('./ui/App');

require('./todoReactions');

React.render(
	<TodoApp />,
	document.getElementById('root')
);
