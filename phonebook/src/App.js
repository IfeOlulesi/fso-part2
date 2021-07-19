import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
  };

  const inputOnChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        Name:
        <input value={newName} type="text" onChange={inputOnChange} />
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((el) => (
          <li key={el.name}> {el.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
