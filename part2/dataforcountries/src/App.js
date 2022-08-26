import { useState, useEffect } from 'react'

const CountryCard = ({country}) => {
	let languages = Object.values(country[0].languages).map((x) => <li>{x}</li>)
	return(
		<div>
			<h1>{country[0].name.common}</h1>
			<p>Capital: {country[0].capital[0]}</p>
			<p>Population: {country[0].population}</p>
			<h3>Lanhuages:</h3>
			<ul>{languages}</ul>
			<br></br>
			<img src={country[0].flags.png} alt={country[0].name.common}/>
		</div>
	)
}

const CountryName = ({name, handleClick}) => {
	return (
		<li>{name} <button onClick={() => handleClick({name})}>select</button></li>
	)
}

const ListCountries = ({list, handleClick}) => {
	console.log('list', list.length)
	if (list.length === 1) {
		return <CountryCard country={list}/>
	} else if (list.length > 10) {
		return <p>Too many results, be more specific</p>
	} else {
		return list.map((country, i) => <CountryName key={i} name={country.name.common} handleClick={handleClick}/>)
	}
}

const App = ({countries}) => {

	const [searchResult, setSearchResult] = useState([]);

	const handleClick = ({name}) => {
		setSearchResult(countries.filter(country => country.name.common.toLowerCase() === name.toLowerCase()));
	}

	const searchCountry = (event) => {
		console.log(event.target.value)
		const pattern = event.target.value;
		let result = countries
			.filter(country => country.name.common.toLowerCase()
			.includes(pattern.toLowerCase()));
		setSearchResult(result);
		if (event.target.value === "") {
			setSearchResult([])
		}
	}

	return (
		<div>
			<form>
				search country: <input onChange={searchCountry} />
				<br></br>
			</form>
			search result:
			<ul>
				<ListCountries list={searchResult} handleClick={handleClick}/>
			</ul>
		</div>
	)
}

export default App;