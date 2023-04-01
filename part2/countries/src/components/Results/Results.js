import React from 'react';
import Country from '../Country/Country';
import CountryListItem from '../CountryListItem';

function Results({ filteredCountries }) {
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  } else {
    return (
      <ul>
        {filteredCountries.map(country => (<CountryListItem key={country.name.common} country={country} />))}
      </ul>
    )
  }
}

export default Results;
