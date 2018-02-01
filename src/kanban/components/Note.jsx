import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
}

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
}

const Note = ({
  connectDragSource, connectDropTarget, isDragging,
  isOver, onMove, id, children, editing, ...props
}) => {
  const dragSource = editing ? a => a : connectDragSource;

  return dragSource(connectDropTarget(
    <li style={{
      opacity: isDragging || isOver ? 0 : 1
    }} {...props}>
      {children}
    </li>
  ));
};

export default compose(
  DragSource('note', noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget('note', noteTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })),
)(Note);
