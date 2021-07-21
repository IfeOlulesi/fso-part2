import React, { useEffect, useState } from "react";
import contactService from "./services/contacts";

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

const ShowContacts = ({ contacts, filterQuery, deleteContact }) => {
  // huge bug here: filter accepts name, number and id...fix this 
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
              <form id={el.id}>
                {el.name} {el.number}
              </form>
              <button
                form={el.id}
                type="button"
                onClick={() => deleteContact(el.id)}
              >
                delete
              </button>
            </li>
          ))}
      </ol>
    </>
  );
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    contactService.getAll().then((allContacts) => setContacts(allContacts));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const contactNameExists = contacts.findIndex((el) => el.name === newName);
    const contactNumberExists = contacts.findIndex(
      (el) => el.number === newNumber
    );

    if (newName === "" || newNumber === "") {
      alert("Name and Number fields can't be empty");
    } 
    
    else if (contactNameExists !== -1) {
      if (
        window.confirm(
          `${contacts[contactNameExists].name} is already added to the phonebook. Do you want to replace the old number with the new one?`
        )
      ) 
      {
        contactService
          .update(contacts[contactNameExists].id, {
            ...contacts[contactNameExists],
            number: newNumber,
          })
          .then((returnedContact) => {
            let temp = [...contacts];
            temp[contactNameExists] = {
              ...temp[contactNameExists],
              number: returnedContact.number,
            }
            setContacts(temp)
          });
      }
    } 
    
    else if (contactNumberExists !== -1) {
      alert(
        `A contact with that number already exists - ${contacts[contactNumberExists].name}`
      );
      setNewName("");
      setNewNumber("");
    } 
    
    else {
      const newContact = {
        name: newName,
        number: newNumber,
        id: contacts[contacts.length - 1].id + 1,
      };

      contactService
        .create(newContact)
        .then((returnedContact) =>
          setContacts(contacts.concat(returnedContact))
        );

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

  const deleteContact = (id) => {
    const oldContactIndex = contacts.findIndex((el) => el.id === id);

    if (
      window.confirm(
        `Do you want to delete ${contacts[oldContactIndex].name} - ${contacts[oldContactIndex].number}`
      )
    ) {
      contactService.deleteContact(id).then(() => {
        const newContacts = contacts.filter((el) => el.id !== id);
        setContacts(newContacts);
      });
    }
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

      <ShowContacts
        contacts={contacts}
        filterQuery={filterQuery}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
