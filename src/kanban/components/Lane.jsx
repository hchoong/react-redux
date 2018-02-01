import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DragSource, DropTarget} from 'react-dnd';

import * as laneActions from '../actions/lanes';
import * as noteActions from '../actions/notes';

import Notes from './Notes';
import LaneHeader from './LaneHeader';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.notes.length) {
      targetProps.attachToLane(
        targetProps.lane.id,
        sourceId
      );
    }
  }
}

class Lane extends React.Component {
  deleteNote = (laneId, noteId, e) => {
    e.stopPropagation();
    this.props.detachFromLane(laneId, noteId);
    this.props.deleteNote(noteId);
  }

  render() {
    const { connectDropTarget, lane, notes, className, ...props } = this.props
    const laneId = lane.id
    return connectDropTarget(
      <div className={className}>
        <LaneHeader lane={lane} />
        <Notes
          notes={notes}
          onNoteClick={(id) => props.updateNote({id, editing: true})}
          onEdit={(id, task) => props.updateNote({id, editing: false, task})}
          onDelete={(id, e) => this.deleteNote(laneId, id, e)}
        />
      </div>
    );
  }
}

export default compose(
  DropTarget('note', noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect((state, props) => ({
    notes: props.lane.notes.map(id => state.notes[
      state.notes.findIndex(note => note.id === id)
    ]).filter(note => note)
  }), {
    ...laneActions,
    ...noteActions
  })
)(Lane)

