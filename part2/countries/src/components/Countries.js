import React from 'react'
import CountryDetail from './CountryDetail'
import Country from './Country'

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
}

export default Countries