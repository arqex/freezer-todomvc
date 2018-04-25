import React from 'react';
import ReactDom from 'react-dom'
import App from './components/App';

// This will make our app reactive
import './state/todoReactions';

ReactDom.render(
  <App />,
  document.getElementById('root')
);
