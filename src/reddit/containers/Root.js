import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import {selectSubreddit, fetchPostsIfNeeded} from '../actions'

const store = configureStore()

export default class Root extends Component {
  render() {
    store.dispatch(selectSubreddit('reactjs'))
    store.dispatch(fetchPostsIfNeeded('reactjs'))
      .then(() => console.log(store.getState()))

    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}
