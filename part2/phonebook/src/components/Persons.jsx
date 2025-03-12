import personService from '../services/persons'

const Persons = ({ persons, filter, setPersons }) => {
  // Apply filtering dynamically before rendering
  const personsToShow = !filter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id == id)
    if (window.confirm(`Delete ${personToDelete.name}?`))
    personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id != id))
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>
        ))}
      </ul>
    </>
  )
}
export default Persons