import React, { useState } from "react" 

import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [newName, setNewName] = useState("") 
  const [newNumber, setNewNumber] = useState("")
  const [filterParam, setFilterParam] = useState("")
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }  
  ])

  const handleSubmit = (event) => {
    event.preventDefault() 
    const personObject = {
      name: newName,
      number: newNumber
    } 

    JSON.stringify(persons).includes(JSON.stringify(personObject))
      ? alert(`${personObject.name} is already added to the phone book`)
      : setPersons(persons.concat(personObject)) 

    setNewName("") 
    setNewNumber("")
  } 

  const newNameHandler = (event) => {
    setNewName(event.target.value) 
  } 

  const newNumHandler = (event) => {
    setNewNumber(event.target.value) 
  } 

  const filterHandler = (event) => {
    setFilterParam(event.target.value)
  }

  const filterOutput = persons.filter(
    person => JSON
      .stringify(person)
      .toLowerCase()
      .includes(filterParam.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        placeholder="query..." 
        value={filterParam} 
        onChange={filterHandler} 
      />

      <Form 
        handleSubmit = {handleSubmit}
        newName = {newName}
        newNameHandler = {newNameHandler}
        newNumber = {newNumber}
        newNumHandler = {newNumHandler}
      />

      <Numbers 
        filterOutput = {filterOutput}
      />

    </div>
  ) 
} 

export default App 
