import React from 'react';

import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {connect} from 'react-redux';

import Lanes from '../components/Lanes';
import {createLane} from '../actions/lanes'

const App = ({
  lanes, dispatch
}) => (
  <div>
    <button className="add-lane" onClick={() => dispatch(createLane())}>+ Add Lane</button>
    <Lanes lanes={lanes} />
  </div>
)

export default compose(
  DragDropContext(HTML5Backend),
  connect(state => ({
    lanes: state.lanes
  }))
)(App)
