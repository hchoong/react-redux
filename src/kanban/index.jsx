import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import libStorage from './libs/storage';

import configureStore from './configureStore';

import App from './containers/App';
import './main.css';

const APP_STORAGE = 'redux_kanban';
const storage = libStorage(localStorage)
const store = configureStore(storage.get(APP_STORAGE) || {});

store.subscribe(() => {
  if(!storage.get('debug')) {
    storage.set(APP_STORAGE, store.getState());
  }
});

export default () =>
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
