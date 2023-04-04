import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification/Notification";
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = persons.find((person) => person.name === newName);
    if (!name) {
      const newPerson = { name: newName, number: newPhone };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
      });
      setNotificationType('success')
      setMessage(`${newName} is added.`)
    } else {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      changeNumber();
      setNotificationType('success')
      setMessage(`${newName}'s number is changed.`)
    }
    setNewName("");
    setNewPhone("");
  };

  const changeNumber = async () => {
    const person = persons.find(p => p.name === newName);
    if (person) {
      const newPerson = {...person, number: newPhone};
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
    try {
      await personService.clear(id);
      const newPersons = await personService.getAll()
      window.confirm(`Delete person?`)
      setPersons(newPersons);
      setNotificationType('success')
      setMessage(`Person deleted.`)
    } catch {
      setNotificationType('error')
      setMessage(`Person already deleted.`)
    }
  };

  const setMessage = (newMessage) => {
    setNotification(newMessage)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />

      <h3>Add a New Number</h3>
      <Notification message={notification} type={notificationType} />
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
