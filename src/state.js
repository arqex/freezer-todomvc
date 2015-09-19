var Freezer = require('freezer-js'),
	Utils = require('./utils')
;

// Try to recover the state from the localStorage
var state = Utils.store('freezerTodos') || {
	todos: [],
	todoInput: '',
	status: 'ready',
	filter: 'all'
};

// Returns the freezer instance with the state.
module.exports = new Freezer( state );
