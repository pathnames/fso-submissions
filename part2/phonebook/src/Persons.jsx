const Persons = ( { persons, filter }) => {
     // Apply filtering dynamically before rendering
  const personsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

    return (
        <>
         <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
        </>
    )
}
export default Persons