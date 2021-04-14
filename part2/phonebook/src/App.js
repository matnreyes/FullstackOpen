import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ searchResult, setSearchResult ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  
  // Load person data from server 
  useEffect( () => {
    contactService
      .getContacts()
      .then(contacts => {
        setPersons(contacts)
        setSearchResult(contacts)
      })
  }, [])
  
  // Adds new contact onto server
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const match = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
    if (match) {
      alert (`${newName} is already in phonebook`)
      return
    }
    
    contactService
      .addContacts(nameObject)
      .then(newContact => {
        setPersons(persons.concat(newContact))
        setSearchResult(persons.concat(newContact))
      })
    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput  = (event) => {
    setNewNumber(event.target.value)
  }
  
  // Deletes contacts
  const handleDelete = (event) => {
    contactService.deleteContact(event.target.value).then(updatedContacts => {
      setPersons(updatedContacts)
      setSearchResult(updatedContacts)
    })
    .catch(error => {
     alert(
      'Contact has already been deleted'
     )
    setPersons(persons.filter(person => person.id !== event.target.value))
    setSearchResult(persons.filter(person => person.id !== event.target.value))
    })
      
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
      <Persons numbers={searchResult} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
