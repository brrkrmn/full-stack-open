import React from 'react';
import countryService from './services/countries';
import Results from './components/Results/Results';
import './index.css';

function App() {
  const [countries, setCountries] = React.useState([]);
  const [filteredCountries, setFilteredCountries] = React.useState([])
  const [searchInput, setSearchInput] = React.useState('');
  
  React.useEffect(() => {
    countryService.getAll().then(response => setCountries(response));
  }, [])

  React.useEffect(() => {
    filterCountries();
  }, [searchInput]) 

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  }

  const filterCountries = () => {
    const newFilteredCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchInput)
    })
    setFilteredCountries(newFilteredCountries);
  }

  return (
    <div className='wrapper'>
      <h1>Find Countries</h1>
      <input 
        className='input'
        value={searchInput}
        onChange={handleSearch}
      />
      <Results className='results' filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
