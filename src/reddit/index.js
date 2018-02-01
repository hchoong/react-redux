import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from './configureStore'

import AsyncApp from './containers/AsyncApp'

const store = configureStore()

export default () =>
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:page?" component={AsyncApp} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
