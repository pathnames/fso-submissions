const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, handleAddPerson }) => {
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    return (
        <><form onSubmit={handleAddPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
        </>
    )
}
export default PersonForm