import update from 'react-addons-update'
import * as types from '../actions/lanes'

const initialState = []

export default function lanes(state=initialState, action) {
  switch(action.type) {
    case 'CREATE_LANE':
      return [...state, action.lane];
    case 'UPDATE_LANE':
      var {type, ...updatedLane} = action
      return state.map(lane => {
        if(lane.id === action.id) {
          return {...lane, updatedLane}
        }
        return lane;
      });
    case 'DELETE_LANE':
      return state.filter(lane => lane.id !== action.id)
    case 'ATTACH_LANE':
      return state.map(lane => {
        if(lane.notes.includes(action.noteId)) {
          return {...lane,
            notes: lane.notes.filter(note => note !== action.noteId)
          }
        }
        if(lane.id === action.laneId) {
          return {...lane,
            notes: [...lane.notes, action.noteId]
          }
        }
        return lane;
      })
    case 'DETACH_LANE':
      return state.map(lane => {
        if(lane.id === action.laneId) {
          return {...lane,
            notes: lane.notes.filter(note => note !== action.noteId)
          }
        }
        return lane;
      })
    case 'MOVE':
      var sourceId = action.sourceId
      var targetId = action.targetId
      var lanes = state;
      console.log(`source: ${sourceId}, target: ${targetId}`);
      var sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
      var targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];

      var sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
      var targetNoteIndex = targetLane.notes.indexOf(targetId);

      if(sourceLane === targetLane) {
        return state.map(lane => {
          return lane.id === sourceLane.id
            ? {...lane,
              notes: update(sourceLane.notes, {
                $splice: [
                  [sourceNoteIndex, 1],
                  [targetNoteIndex, 0, sourceId]
                ]
              })
            }
            : lane;
        })
      } else {
        return state.map(lane => {
          if (lane === sourceLane) {
            return {...lane,
              notes: lane.notes.length > 1
                ? lane.notes
                  .slice(0, sourceNoteIndex)
                  .concat(lane.notes.slice(sourceNoteIndex+1))
                : []
            }
          }
          if (lane === targetLane) {
            return {...lane,
              notes: lane.notes
                .slice(0, targetNoteIndex)
                .concat([sourceId])
                .concat(lane.notes.slice(targetNoteIndex))
            }
          }
        })
      }
    default:
      return state
  }
}
