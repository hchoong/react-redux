import React from 'react';
import {connect} from 'react-redux';

import * as laneActions from '../actions/lanes';
import * as noteActions from '../actions/notes';

import Editable from './Editable';

class LaneHeader extends React.Component {
  addNote(laneId, e) {
    e.stopPropagation();
    const o = this.props.createNote({
      task: 'New task'
    });
    this.props.attachToLane(laneId, o.note.id);
  }

  deleteLane(lane, e) {
    e.stopPropagation();
    const laneId = lane.id;
    lane.notes.forEach(noteId => {
      this.props.detachFromLane(laneId, noteId);
      this.props.deleteNote(noteId);
    })
    this.props.deleteLane(laneId);
  }

  render() {
    const {lane, ...props} = this.props
    const laneId = lane.id
    return (
        <div className="lane-header"
          onClick={() => props.updateLane({id: laneId, editing: true})}
        >
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, laneId)}>+ Add Note</button>
          </div>
          <Editable className="lane-name"
            editing={lane.editing}
            value={lane.name}
            onEdit={(name) => props.updateLane({id: laneId, name, editing: false})}
          />
          <div className="lane-delete">
            <button onClick={this.deleteLane.bind(this, lane)}>x</button>
          </div>
        </div>
    );
  }
}
export default connect(() => ({}), {
  ...laneActions,
  ...noteActions
})(LaneHeader)
