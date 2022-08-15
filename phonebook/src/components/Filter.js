import { useState } from 'react'

const SearchResult = (props) => {
	let elements =	props.props.map((x) => <p key={x.id}>{x.name} - {x.number}</p>)
	return elements;
}

const Filter = ({persons}) => {
	const [searchResult, setSearchResult] = useState([]);

	const searchPerson = (event) => {
		let found = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
		setSearchResult(found);
		if (event.target.value === '') {
			setSearchResult([]);
		}
	}

	return (
		<div>
			<input onChange={searchPerson}/>
			<SearchResult props={searchResult} />
		</div>
	)
}

export default Filter