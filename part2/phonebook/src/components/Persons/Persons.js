import React from 'react';
import Person from '../Person/Person';

function Persons({ persons }) {
  return (
    persons.map((person, index) => {
      return(
        <Person key={index} person={person} />
      )
    })
  )
}


export default Persons;
