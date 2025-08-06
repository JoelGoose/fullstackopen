import axios from 'axios'
import { useState, useEffect } from 'react'

const Filter = ({ searchTerm, handleSearchChange }) => {
  return(
    <input value={searchTerm} onChange={handleSearchChange}/>
  )
}

const ListedCountries = ({ countries }) => {
  return (
    <div>
      {countries.map(country =>
        <div key={country.cca2}>{country.name.common}</div>
      )}
    </div>
  )
}

const MatchedCountry = ({ countryArray }) => {
  const country = countryArray[0]
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {(Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  )
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    if (searchTerm) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
         filteredCountries.forEach(country => console.log(country))
         setCountries(filteredCountries)
      })
    } else {
      setCountries([])
    }
  }

  useEffect(hook, [searchTerm])

  const handleSearchChange = (event) => {
    console.log('SearchTerm: ', event.target.value)
    setSearchTerm(event.target.value)  
  }
  
  return (
    <div>
      find countries
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      {countries.length > 10 && <div>Too many matches, specify another filter</div>}
      {countries.length <= 10 && countries.length > 1 && <ListedCountries countries={countries}/>}
      {countries.length === 1 && <MatchedCountry countryArray={countries}/>}
    </div>
  )
}

export default App
