import React, { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './components/services/persons'
import './index.css'


const Filter = ({value, onChange}) => {
    return(
        <div>
            <form>
                <div>
                    filter search <input value={value} onChange={onChange}>
                    </input>
                </div>
            </form>
        </div>
    )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return(
        <div>
            <form onSubmit={addName}>
                <div>
                    name: <input value ={newName} onChange={handleNameChange}/>
                    <div>number: <input value={newNumber} onChange={handleNumberChange}/>
                    </div>
                    </div>
                    <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const Persons = ({persons, hookDelete}) => {
  return(
      <ul>
          {persons.map(person => <li key={person.id}>{person.name} {person.number} 
          <button onClick={() => hookDelete(person.id)}>Delete</button></li>)   
          }     
      </ul>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('new name')
  const [ newNumber, setNewNumber ] = useState('new number')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ notification, setNotification ] = useState(null)

  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialData => {
        console.log('promise fulfilled')
        setPersons(initialData)
      })
  }
  useEffect(hook, [])

  const hookDelete = (id) => {
    console.log('delete start')
    if (window.confirm('Do you want to delete this entry?')) {
      noteService
      .delPerson(id)
      .then(del => 
        {
          const newList = persons.filter(person => person.id !== id)
          setPersons(newList)
        }
      )
    }
  }

  const notify4sec = () => {
    setTimeout(() => {
    setNotification(null)
  }, 4000)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
      if (newSearch === '') {
        console.log(event.target.value)
      } else {
        console.log(event.target.value)
        setShowAll(false)
      }
      setNewSearch(event.target.value)
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) === true)

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          number: newNumber,
      }
      const identicalName = persons.find(person => person.name === nameObject.name)
      if (Boolean(identicalName)===true) {
        if (identicalName.number === nameObject.number) {
        setNotification(`${nameObject.name} is already added to the phonebook`)
        notify4sec()
        } else {
         if(window.confirm('Do you want to change this phonenumber?')) {
            noteService
            .update(identicalName.id, nameObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
              setNotification(`${nameObject.name} changed its phonenumber`)
              notify4sec()
            })
            .catch(error => {
              setNotification(`${nameObject.name} was already deleted from server`)
              notify4sec()
            })

          }

        }
      } 
      else if (nameObject.name === '' || nameObject.number === '') {
        window.alert("Empty slots")
      } 
      else {
        noteService
          .create(nameObject)
          .then(newNote => {
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
            setNotification(`${nameObject.name} added to the phonebook`)
            notify4sec()
          })
      }

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter value={newSearch} onChange={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} hookDelete={hookDelete}/>
     </div>
  )
}

export default App