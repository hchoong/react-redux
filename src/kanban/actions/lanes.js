import uuid from 'uuid';

export function createLane(lane={}) {
  return {
    type: 'CREATE_LANE',
    lane: {
      id: uuid.v4(),
      notes: lane.notes || [],
      name: lane.name || 'New lane',
      ...lane
    }
  }
}

export function updateLane(updatedLane) {
  return {
    type: 'UPDATE_LANE',
    ...updatedLane
  }
}

export function deleteLane(id) {
  return {
    type: 'DELETE_LANE',
    id
  }
}

export function attachToLane(laneId, noteId) {
  return {
    type: 'ATTACH_LANE',
    laneId,
    noteId
  }
}

export function detachFromLane({laneId, noteId}) {
  return {
    type: 'DETACH_LANE',
    laneId,
    noteId
  }
}

export function move({sourceId, targetId}) {
  return {
    type: 'MOVE',
    sourceId,
    targetId
  }
}
