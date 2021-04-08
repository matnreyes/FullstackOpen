import React from 'react'

const Persons = ({numbers}) => (
    <ul>{numbers.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}</ul>
)

export default Persons