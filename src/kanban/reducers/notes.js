const initialState = []

export default function notes(state=initialState, action) {
  switch(action.type) {
    case 'CREATE_NOTE':
      return [...state, action.note]
    case 'UPDATE_NOTE':
      return state.map(note => {
        if(note.id === action.id) {
          const {type, ...updatedNote} = action
          return {...note, updatedNote}
        }
        return note
      })
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.id)
    default:
      return state
  }
}
