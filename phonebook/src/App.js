import { useState } from 'react'
import Filter from './components/Filter.js'
import AddPerson from './components/AddPerson.js'
import Persons from './components/Persons.js'

const App = () => {
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])

	function onlyNumbers(str) {
		return /^\+?[0-9]+$/.test(str);
	}

	const addName = (event) => {
		event.preventDefault();

		let nameToAdd = newName.trim();
		let numberToAdd = newNumber.trim();
		var duplicateName  = persons.find(item => item.name === nameToAdd);
		var duplicateNumber = persons.find(item => item.number === numberToAdd);

		if (duplicateName) {
			alert(`${newName} is already present in the phone book`)
		}
		else if (nameToAdd === "")
			alert('Please add a name')
		else if (onlyNumbers(numberToAdd) === false) {
			alert(`${newNumber} is not a valid number`)
		}
		else if (duplicateNumber) {
			alert(`${newNumber} is already present in the phone book`)
		}
		else {
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1
			}
			setPersons(persons.concat(personObject));
		}
		setNewName('');
		setNewNumber('');
	}

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value);
	}

	const handleNewName = (event) => {
		setNewName(event.target.value);
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<h3>Search</h3>
				<Filter persons={persons}/>
			<h3>Add a number</h3>
				<AddPerson newName={newName} addName={addName} handleNewName={handleNewName} handleNewNumber={handleNewNumber} newNumber={newNumber}/>
			<h2>Numbers</h2>
			<Persons persons={persons}/>
		</div>
	)
}

export default App