import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

// import Game from './TicTacToe';
// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );

// ================================

// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import todoApp from './todo/reducers'
// import App from './todo/components/App'

// let store = createStore(todoApp)
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )

// ================================

import Root from './reddit/containers/Root'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

