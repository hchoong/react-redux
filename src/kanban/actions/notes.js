export function createNote(note) {
  return {
    type: 'CREATE_NOTE',
    note
  }
}
export function updateNote(updatedNote) {
  return {
    type: 'UPDATE_NOTE',
    ...updatedNote
  }
}
export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    id
  }
}
