import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import AddPerson from './components/AddPerson.js'
import Persons from './components/Persons.js'
import numbersService from './services/numbers.js'
import './index.css'

const App = () => {
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [persons, setPersons] = useState([])

	useEffect(() => {
		numbersService.getAll()
		.then(response => {
			setPersons(response.data);
		})
	}, [])

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
			console.log(numberToAdd)
			if (window.confirm(`Do you want update number for ${duplicateName.name}`) === true) {
				const personObject = {
					name: nameToAdd,
					number: numberToAdd,
				}
				numbersService.updateNumber(personObject, duplicateName.id)
				.then(response => {
					const objIndex = persons.findIndex(person => person.id === response.data.id);
					const copy = [...persons];
					copy[objIndex].number = response.data.number;
					setPersons(copy);
				})

			}
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
			}
			numbersService.createNumber(personObject)
			.then(response => {
				console.log(response);
				setPersons(persons.concat(response.data));

			})
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
			<Persons persons={persons} setPersons={setPersons}/>
		</div>
	)
}

export default App