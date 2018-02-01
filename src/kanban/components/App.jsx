import React from 'react';
import uuid from 'uuid';

import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {connect} from 'react-redux';

import Lanes from './Lanes';
import {createLane} from '../actions/lanes'

class App extends React.Component {
  render() {
    const {lanes, createLane} = this.props

    return (
      <div>
        <button className="add-lane" onClick={createLane.bind(null, {
          id: uuid.v4(),
          name: 'New lane'
        })}>+ Add Lane</button>
        <Lanes lanes={lanes} />
      </div>
    );
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(state => ({
    lanes: state.lanes
  }), {
    createLane
  })
)(App)
