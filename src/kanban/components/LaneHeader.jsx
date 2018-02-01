import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';

import * as laneActions from '../actions/lanes';
import * as noteActions from '../actions/notes';

import Editable from './Editable';

class LaneHeader extends React.Component {
  constructor(props) {
    super(props)
    this.laneId = props.lane.id
  }
  addNote = (laneId, e) => {
    e.stopPropagation();
    const noteId = uuid.v4();
    this.props.createNote({
      id: noteId,
      task: 'New task'
    });
    this.props.attachToLane({laneId, noteId});
  };

  activateLaneEdit = (laneId) => {
    this.props.updateLane({
      id: laneId,
      editing: true
    });
  };

  editName = (laneId, name) => {
    this.props.updateLane({
      id: laneId,
      name,
      editing: false
    })
  };

  deleteLane = (laneId, e) => {
    e.stopPropagation();
    this.props.deleteLane(laneId);
  };

  render() {
    const {lane, ...props} = this.props
    const laneId = lane.id
    return (
        <div className="lane-header" onClick={() => this.activateLaneEdit(laneId)} {...props}>
          <div className="lane-add-note">
            <button onClick={(e) => this.addNote(laneId, e)}>+ Add Note</button>
          </div>
          <Editable className="lane-name" editing={lane.editing} value={lane.name} onEdit={(name) => this.editName(laneId, name)} />
          <div className="lane-delete">
            <button onClick={() => this.deleteLane(laneId)}>x</button>
          </div>
        </div>
    );
  }
}
export default connect(state => state, {
  ...laneActions,
  ...noteActions
})(LaneHeader)
