import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      id: 0
    }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(addName)}>
        <div>
          name: <input value={newName} onChange={(handleNameInput)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul> 
        {persons.map((person) => <li key={person.id}> {person.name} </li>)}
      </ul>
    </div>
  )
}

export default App