import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const Countries = ({results, search}) => {
  if (search === '') {
    return <p></p>
  }
  
  if (results.length >= 10) {
    return <p>Too many matches, please specify more</p> 
  } 
  if (results.length > 1) {
    return <div>
    {results.map(result => <Country key={result.name.common} result={result}/>)}
  </div> 
  }
  if (results.length === 1) {
    console.log(results[0])
    return (
      <div>
        <CountryDetail result={results[0]}/>
      </div>
    )
  }
  if (results.length === 0) {
    return (
      <div>
        <p>No results</p>
      </div>
    )
  } 
}

const CountryDetail = ({result}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const params = {
    access_key : api_key,
    query : result.name.common
  }
  const [ wResults, setWResults ] = useState(null)
  const hookWeather = () => {
    console.log('weather')
    axios
      .get('http://api.weatherstack.com/current',
        {params})
      .then(response => {
        console.log('weather promise')
        setWResults(response.data)  
      })
  }
  useEffect(hookWeather, [])
  console.log(wResults)

  if (wResults === null) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div>
            <h1>{result.name.common}</h1>
      <p> Capital: {result.capital}</p>
      <p> Population: {result.population}</p>
      <h3>languages</h3>
      <ul> 
        {Object.values(result.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <div>
        <h1>{result.flag}</h1>
      </div>
      <div>
        <h3>Weather in {result.capital}</h3>
        <p><b>temperature:</b> {wResults.current.temperature} degrees</p>
        {Object.values(wResults.current.weather_icons).map(icon => <img key={icon} src={icon}></img>)}
        <p><b>wind:</b> {wResults.current.wind_speed} mph direction {wResults.current.wind_dir}</p>
      </div>
      </div>
    )
  }

}


const Country = ({result, details}) => {
  const [ showDetails, setShowDetails ] = useState(false)
  const handleShowDetails = () => {
    if (showDetails === true) {
      setShowDetails(false)
    } else {
      setShowDetails(true)
    }
  }
  if (showDetails === false) {
    return (
      <div>
      <li> {result.name.common} <button onClick={handleShowDetails}> Show
      </button></li>
      </div>
    )
  } else {
    return (
      <CountryDetail result={result}/>
    )
  } 
}


const App = () => {
  const [ results, setResults ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState(true)
  const handleSearch = (event) => {
    if (newSearch === '') {
      console.log(event.target.value)
    } else {
      console.log(event.target.value)
      setShowSearch(false)
    }
    setNewSearch(event.target.value)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setResults(response.data)
      })
  }
  useEffect(hook, [])

  const resultsToShow = showSearch
  ? results
  : results.filter(result => result.name.common.toLowerCase().includes(newSearch.toLowerCase()) === true)

  return (
    <div>
      <Filter value={newSearch} onChange={handleSearch}/>
      <Countries results={resultsToShow} search={newSearch}/>
    </div>
  );
}

export default App;
