import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	const handleNameInput = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberInput = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchChange = (event) => {
		setSearch(event);
		console.log(search);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (newName !== "" && newNumber !== "") {
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			};
			const existsName = persons.find((person) => person.name === newName);
			const existsNumber = persons.find((person) => person.number === newNumber);
			if (existsName === undefined && existsNumber === undefined) {
				setPersons([...persons, personObject]);
			} else {
				alert(
					existsName !== undefined
						? `${newName} is already added to phonebook`
						: `${newNumber} is already added to phonebook`
				);
			}
		}
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<div>debug: {newName}</div>
			<h2>Phonebook</h2>
			<form>
				<div>
					<h3>search :</h3>
					<input
						value={search}
						onChange={(event) => handleSearchChange(event.target.value)}
					/>
				</div>
			</form>
			<form>
				<div>
					<h3>add a new number</h3>
					name:{" "}
					<input
						value={newName}
						onChange={(event) => {
							handleNameInput(event);
						}}
					/>
					number:{" "}
					<input
						value={newNumber}
						onChange={(event) => {
							handleNumberInput(event);
						}}
					/>
				</div>
				<div>
					<button
						type='submit'
						onClick={(event) => {
							handleSubmit(event);
						}}
					>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.id}>
					{person.name} - {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
