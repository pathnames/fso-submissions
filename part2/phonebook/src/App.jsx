import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { 
      name: newName, 
      number: newNumber
    }

    if (!persons.some(person => person.name === newName)) {
      personService
        .create(newPerson)
        .then(response => {
          setPersons([...persons, response.data])
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      alert(`${newName} is already in the phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })

  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} handleAddPerson={handleAddPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App
