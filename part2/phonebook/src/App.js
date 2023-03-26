import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = persons.find(person => person.name === newName);
    if (!name) {
      const newPersons = [...persons, {name: newName, phone: newPhone, }];
      setPersons(newPersons);  
    } else {
      alert(`${newName} already exists.`)
    }
    setNewName('');
    setNewPhone('');
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewFilter = (event) => {
    const filter = event.target.value
    setFilter(filter)
    console.log(filter)
    const filtered = persons.filter(person => {
      return person.name.toLowerCase().includes(filter);
    })
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />

      <h3>Add a New Number</h3>
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName} 
        handleNewName={handleNewName} 
        newPhone={newPhone} 
        handleNewPhone={handleNewPhone} 
      />
      
      <h2>Numbers</h2>
      <Persons persons={filter.length === 0 ? persons : filteredPersons} />
    </div>
  )
}

export default App