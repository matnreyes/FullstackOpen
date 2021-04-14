import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ searchResult, setSearchResult ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  
  // Load person data from server
  const personHook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setSearchResult(response.data)
    })
  }
  useEffect(personHook, [])
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setSearchResult(persons.concat(response.data))
        setNewNumber('')
        setNewName('')

      })
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput  = (event) => {
    setNewNumber(event.target.value)
  }

  const searchNames = (event) => {
    const value = event.target.value
    setNewSearch(value)
    setSearchResult(persons.filter(person => person.name.toUpperCase().includes(value.toUpperCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} filter={searchNames}/>
      <h2>add a new</h2>
      <PersonForm submit={addName} nameValue={newName} nameInput={handleNameInput} 
        numberValue={newNumber} numberInput={handleNumberInput}/>
      <h2>Numbers</h2>
      <Persons numbers={searchResult}/>
    </div>
  )
}

export default App
