import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setnotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setnotificationMessage(`Changed number for ${newPerson.name}`)
            setTimeout(() => {          
              setnotificationMessage(null)        
              }, 5000)          
            })
          .catch(error => {
            setErrorMessage(`Information of ${newPerson.name} already deleted from server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons([...persons, response.data])
          setnotificationMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setnotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Failed to create ${newPerson.name}.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
      <Notification message={notificationMessage}/>
      <Error message={errorMessage} />
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
