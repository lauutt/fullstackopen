import React, {useState} from 'react'
import CountryDetail from './CountryDetail'


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

export default Country;