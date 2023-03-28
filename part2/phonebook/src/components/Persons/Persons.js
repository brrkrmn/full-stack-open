import React from 'react';
import Person from '../Person/Person';

function Persons({ persons, handleDeletePerson }) {
  return (
    persons.map((person) => {
      return(
        <div key={person.id}>
          <Person person={person} />
          <button onClick={() => handleDeletePerson(person.id)}>Delete</button>      
        </div>
      )
    })
  )
}


export default Persons;
