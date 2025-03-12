import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleAddPerson = (event) => {
    console.log("Here (1)")
    event.preventDefault()
    const newPerson = { 
      name: newName, 
      number: newNumber, 
      id: persons.length + 1
    }

    if (!persons.some(person => person.name === newName)) {
      console.log("Here (2)")
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newName} is already in the phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
