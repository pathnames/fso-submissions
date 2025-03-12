const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons }) => {
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
          alert(`${newName} already exists in the phonebook!`)
        } else {
          const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
          }
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        }
      }
    
  
    return (
        <><form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
        </>
    )
}
export default PersonForm