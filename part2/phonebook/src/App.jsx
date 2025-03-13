import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleAddPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = { name: newName, number: newNumber }

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with a new one?`
      )
      if (confirmUpdate) {
        personService
          .update(existingPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : response.data
            ))
            setSuccessMessage(`Changed number for ${newPerson.name}`)
            setTimeout(() => {          
              setSuccessMessage(null)        
              }, 5000)          
            })
          .catch(error => {
            console.log(error)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons([...persons, response.data])
          setSuccessMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
        })
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
      <Notification message={successMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        handleAddPerson={handleAddPerson} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

export default App
