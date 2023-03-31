import React from 'react';
import Country from '../Country';

function CountryListItem({ country }) {
  const [isCountryOpen, setIsCountryOpen] = React.useState(false);
  
  const toggleIsCountryOpen = () => {
    setIsCountryOpen(!isCountryOpen);
  }

  return (
    <li>
      {country.name.common}
      <button onClick={toggleIsCountryOpen}>
        {isCountryOpen ? 'hide' : 'show'}
      </button>
      {isCountryOpen && <Country country={country}/>}
    </li>
  )
}

export default CountryListItem;
