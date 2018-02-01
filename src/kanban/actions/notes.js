import uuid from 'uuid';

export function createNote(note) {
  return {
    type: 'CREATE_NOTE',
    note: {
      id: uuid.v4(),
      ...note
    }
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
