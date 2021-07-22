import React, { useEffect, useState } from "react";
import contactService from "./services/contacts";
import "./index.css";

const Filter = ({ filterQuery, filterHandler }) => {
  return (
    <div className="filterRoot">
      <h2>Filter shown by</h2>
      <input
        type="text"
        value={filterQuery}
        onChange={filterHandler}
        className="filterSearch"
        placeholder="string"
      />
    </div>
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
        <input
          value={newName}
          type="text"
          onChange={newNameHandler}
          className="addSearch"
          placeholder="new name"
        />
      </div>
      <div>
        Numbers:
        <input
          value={newNumber}
          type="number"
          onChange={newNumberHandler}
          className="addSearch"
          placeholder="new number"
        />
      </div>
      <button type="submit" onClick={handleSubmit} className="addButton">
        add
      </button>
    </form>
  );
};

const ShowContacts = ({ contacts, filterQuery, deleteContact }) => {
  // huge bug here: filter accepts name, number and id...fix this
  return (
    <>
      <h2 style={{ color: "white" }}>Contacts</h2>
      <ol>
        {contacts
          .filter((contact) =>
            JSON.stringify(contact)
              .toLowerCase()
              .trim()
              .includes(filterQuery.toLowerCase())
          )
          .map((el) => (
            <li key={el.name} className="singleContact">
              {el.name} {el.number}
              <button
                className="deleteButton"
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

const Notification = ({ message }) => {
  const red = "rgb(212, 56, 56)";
  const green = "rgb(74, 185, 52)";
  if (message.status === null) return null;
  return (
    <div
      className="error"
      style={{
        backgroundColor: message.status === "success" ? green : red,
      }}
    >
      <div className="statusCode">{message.statusCode} </div>
      <div className="statusText">{message.statusText}</div>
    </div>
  );
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [notification, setNotification] = useState({
    status: null,
    statusCode: null,
    statusText: null,
  });

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
    } else if (contactNameExists !== -1) {
      if (
        window.confirm(
          `${contacts[contactNameExists].name} is already added to the phonebook. Do you want to replace the old number with the new one?`
        )
      ) {
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
            };
            setContacts(temp);
            setNotification({
              status: "success",
              statusCode: "200",
              statusText: "Updated Successfully!",
            });

            setTimeout(() => {
              setNotification({
                ...notification,
                status: null,
              });
            }, 2000);
          });
      }
    } else if (contactNumberExists !== -1) {
      alert(
        `A contact with that number already exists - ${contacts[contactNumberExists].name}`
      );
      setNewName("");
      setNewNumber("");
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
        id: contacts[contacts.length - 1].id + 1,
      };

      contactService.create(newContact).then((response) => {
        setNotification({
          status: "success",
          statusCode: response.status,
          statusText: "Created Successfully!",
        });
        setTimeout(() => {
          setNotification({
            ...notification,
            status: null,
          });
        }, 2000);
        setContacts(contacts.concat(response.data));
      });

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
      contactService
        .deleteContact(id)
        .then(() => {
          debugger;
          const newContacts = contacts.filter((el) => el.id !== id);
          setContacts(newContacts);
          setNotification({
            status: "success",
            statusCode: 200,
            statusText: "Deleted Successfully",
          });
          setTimeout(() => {
            setNotification({
              ...notification,
              status: null,
            });
          }, 2000);
        })
        .catch(() => {
          setNotification({
            status: "error",
            statusCode: 200,
            statusText: "Contact has already been deleted",
          });
          setTimeout(() => {
            setNotification({
              ...notification,
              status: null,
            });
          }, 2000);

          // remove from contacts
          console.log(contacts, id)
          setContacts(contacts.filter((el) => el.id !== id))
        });
    }
  };

  return (
    <>
      <h1 className="header">Phonebook</h1>
      <Notification message={notification} />

      <div className="root">
        <div className="functionSection">
          <Filter filterQuery={filterQuery} filterHandler={filterHandler} />

          <AddContacts
            newName={newName}
            newNameHandler={newNameHandler}
            newNumber={newNumber}
            newNumberHandler={newNumberHandler}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className="displayContacts">
          <ShowContacts
            contacts={contacts}
            filterQuery={filterQuery}
            deleteContact={deleteContact}
          />
        </div>
      </div>
    </>
  );
};

export default App;
