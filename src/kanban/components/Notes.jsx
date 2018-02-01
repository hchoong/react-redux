import React from 'react';
import {connect} from 'react-redux';

import Editable from './Editable';
import Note from './Note';

import {move} from '../actions/lanes';

const Notes = ({
  notes, onNoteClick, onEdit, onDelete, move
}) => (
  <ul className="notes">{notes.map(({id, editing, task}) =>
    <Note className="note" id={id} key={id}
      editing={editing}
      onClick={onNoteClick.bind(null, id)}
      onMove={move}>
      <Editable
        className="editable"
        editing={editing}
        value={task}
        onEdit={onEdit.bind(null, id)} />
      <button
        className="delete"
        onClick={onDelete.bind(null, id)}>x</button>
    </Note>
  )}</ul>
);

export default connect(() => ({}), {
  move
})(Notes);

// export default Notes;
