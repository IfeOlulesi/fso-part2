import React, { useEffect, useState } from "react";
import axios from 'axios'

const Filter = ({ filterQuery, filterHandler }) => {
  return (
    <>
      <h2>Filter shown by</h2>
      <input type="text" value={filterQuery} onChange={filterHandler} />
    </>
  );
};

const AddContacts = ({
  newName,
  newNameHandler,
  newNumber,
  newNumberHandler,
  handleSubmit,
}) => {
  return (
    <form>
      <h3>Add Contacts</h3>
      <div>
        Name:
        <input value={newName} type="text" onChange={newNameHandler} />
      </div>
      <div>
        Numbers:
        {}
        <input value={newNumber} type="number" onChange={newNumberHandler} />
      </div>
      <button type="submit" onClick={handleSubmit}>
        add
      </button>
    </form>
  );
};

const ShowContacts = ({ contacts, filterQuery }) => {
  return (
    <>
      <h2>Contacts</h2>
      <ol>
        {contacts
          .filter((contact) =>
            JSON.stringify(contact)
              .toLowerCase()
              .trim()
              .includes(filterQuery.toLowerCase())
          )
          .map((el) => (
            <li key={el.name}>
              {el.name} {el.number}
            </li>
          ))}
      </ol>
    </>
  );
};

const App = () => {
  
  const baseUrl = `http://localhost:3010/persons`;
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    const request = axios.get(baseUrl);
    request.then(response => setContacts(response.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      alert("Name and Number fields can't be empty");
    } else if (
      contacts.findIndex(
        (el) => el.name === newName || el.number === newNumber
      ) === -1
    ) {
      setContacts(contacts.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} has already been added`);
      setNewName("");
      setNewNumber("");
    }
  };

  const newNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const filterHandler = (event) => {
    setFilterQuery(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterQuery={filterQuery} filterHandler={filterHandler} />

      <AddContacts
        newName={newName}
        newNameHandler={newNameHandler}
        newNumber={newNumber}
        newNumberHandler={newNumberHandler}
        handleSubmit={handleSubmit}
      />

      <ShowContacts contacts={contacts} filterQuery={filterQuery} />
    </div>
  );
};

export default App;
