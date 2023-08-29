import { useState, useEffect } from 'react'
import Persons from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [originalPersons, setOriginalPersons] = useState(persons)
  const [filterInput, setFilterInput] = useState("")

  const hook = () => {
    axios
    //.get("http://localhost:3001/persons")
    .get("https://raw.githubusercontent.com/tojutaha/puhelinluettelo/main/db.json")
    .then(response => {
      setPersons(response.data)
    })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newEntry = {
      name: newName,
      number: newNumber,
    }

    const exists = persons.some(newEntry => newEntry.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newEntry))
      setNewName('')
      setNewNumber('')
      setOriginalPersons(originalPersons.concat(newEntry))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const inputValue = event.target.value.toLowerCase()
    if (inputValue.length === 0) {
      setPersons(originalPersons)
    } else {
      setFilterInput(inputValue)
      const filter = originalPersons.filter(person => person.name.toLowerCase().includes(inputValue))
      setPersons(filter)
    }
  }

  const handleBackSpace =() => {
    const newFilterInput = filterInput.slice(0, -1)
    setFilterInput(newFilterInput)
    const filter = originalPersons.filter(person => person.name.toLowerCase().includes(newFilterInput));
    setPersons(filter);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} handleBackSpace={handleBackSpace} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App