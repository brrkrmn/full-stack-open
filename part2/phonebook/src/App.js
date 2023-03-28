import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = persons.find((person) => person.name === newName);
    if (!name) {
      const newPerson = { name: newName, phone: newPhone };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
      });
    } else {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      changeNumber();
    }
    setNewName("");
    setNewPhone("");
  };

  const changeNumber = async () => {
    const person = persons.find(p => p.name === newName);
    if (person) {
      const newPerson = {...person, phone: newPhone};
      await personService.update(newPerson.id, newPerson);
      const newPersons = await personService.getAll();
      setPersons(newPersons)
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleNewFilter = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    console.log(filter);
    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(filter);
    });
    setFilteredPersons(filtered);
  };

  const handleDeletePerson = async (id) => {
   await personService.clear(id);
   const newPersons = await personService.getAll();
   window.confirm(`Delete person?`)
   setPersons(newPersons);
  };

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
      <Persons handleDeletePerson={handleDeletePerson} persons={filter.length === 0 ? persons : filteredPersons} />
    </div>
  );
};

export default App;
