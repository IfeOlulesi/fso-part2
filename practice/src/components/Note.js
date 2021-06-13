import React from 'react'


const Note = ({ note, toggleImportance }) => {

  const label = note.important
    ? 'make not important'
    : 'make important'
  return (
    <li key={note.id} className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note;