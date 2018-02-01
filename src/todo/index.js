import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createStore } from 'redux'

import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

export default () =>
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
