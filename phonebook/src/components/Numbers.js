import React from 'react';

const Numbers = ({ filterOutput }) => {
  return (
    <React.Fragment>
      <h2>Numbers</h2>
      <ol>
        {filterOutput.map((person) => (
          <li key={person.name}>{person.name}  {person.number}</li>
        ))}
      </ol>
    </React.Fragment>
  )
}

export default Numbers;