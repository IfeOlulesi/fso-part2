import React, { useState, useEffect } from "react" 
import axios from 'axios'

import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
  const [newName, setNewName] = useState("") 
  const [newNumber, setNewNumber] = useState("")
  const [filterParam, setFilterParam] = useState("")
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log("Effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("promise fulfilled")
        setPersons(response.data)
      })
  }, [])

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
