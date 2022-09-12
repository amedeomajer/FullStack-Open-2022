import numbersService from '../services/numbers'

const Persons = ({persons, setPersons}) => {
	console.log(persons)
	const deletePerson = (person) => {
		if (window.confirm(`DO you REALLY want to DELETE ${person.name}`) === true)
		{
			console.log(person)
			numbersService.deleteNumber(person.id)
			.then( () => {
				const newArr = persons.filter(p => p.id !== person.id)
				setPersons(newArr)
			})
		}
	}

	return (
		persons.map((person) => {
			return (
				<p key={person.id}>{person.name} - {person.number} <button onClick={() => deletePerson(person)}>delete</button> </p>
			)
		})
	)
}

export default Persons