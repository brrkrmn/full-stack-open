import React from 'react';
import Weather from '../Weather/Weather';

function Country({ country }) {
  const languages = Object.values(country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      
      <p><b>Languages:</b></p>

      <ul>
        {languages.length > 1 
          ? languages.map(language => (<li key={language}>{language}</li>))
          : <li>{languages}</li>
        }
      </ul>
      
      <div>{country.flag}</div>

      <Weather country={country} />
    </>

  )
}

export default Country;
