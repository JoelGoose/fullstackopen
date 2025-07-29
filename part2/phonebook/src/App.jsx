import { useState, useEffect } from 'react'
import Person from './components/Person'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import service from './services/serverCommunication.js'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const hook = () => {
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  // sets a notification with a specified message for 5 seconds, resets to success after
  const setNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null),
      setNotificationType('success')
    }, 5000)
  } 

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        service
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNotification(`Updated ${newName}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            console.log('Trying to access data which was removed')
            setNotificationType('error')
            setNotification(`Information of ${newName} has already been deleted from the server`)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    service
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      service.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification(`Deleted ${person.name}`)
        })
    }
}

  const handlePersonChange = (event) => {
    console.log('Name ', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('Number ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log('SearchTerm ', event.target.value)
    setSearchTerm(event.target.value)  
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage} type={notificationType}/>
        filter shown with
        <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      <h2>Add a new person</h2>
      <NewPersonForm
        onSubmit={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <div key={person.id}>
            <Person person={person}/>
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App