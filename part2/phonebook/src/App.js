import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '(555)701-9832',
      id: 0
    }
  ]) 
  const [ searchResult, setSearchResult ] = useState(persons)
  const [ newSearch, setNewSearch ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const match = persons.find((person) => person.name === nameObject.name)
    match ? window.alert(`${nameObject.name} is already in the phonebook`) : 

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput  = (event) => {
    setNewNumber(event.target.value)
  }

  const searchNames = (event) => {
    setNewSearch(event.target.value)
    newSearch == '' ? 
      setSearchResult(persons) :
      setSearchResult(persons.filter((person) => person.name.toUpperCase() === event.target.value.toUpperCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>Filter names: <input value={newSearch} onChange={searchNames}/></div>
      </form> 
      <h2>add a new</h2>
      <form onSubmit={(addName)}>
        <div>name: <input value={newName} onChange={(handleNameInput)}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput}/></div>
        <div> <button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>{searchResult.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}</ul>
    </div>
  )
}

export default App