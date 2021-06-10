import React from 'react'

const Form = ({ handleSubmit, newName, newNameHandler, newNumber, newNumHandler }) => {
  return (
    <React.Fragment>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
            placeholder="name..." 
            value={newName} 
            onChange={newNameHandler} 
          />
        </div>
        <div>
          number: <input 
            placeholder="number..." 
            value={newNumber} 
            onChange={newNumHandler} 
          />
        </div>
        <div>
          <button type="submit"> add</button>
        </div>
      </form>

    </React.Fragment>
  )
}

export default Form;