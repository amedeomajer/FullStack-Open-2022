import { useState } from "react"

const CountryCard = ({country, handleClick}) => {
	console.log(country)
	const languagesList = Object.values(country.languages).map(language => <li key={language}>{language}</li>)
	
	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>Capital: {country.capital[0]}</p>
			<p>Population: {country.population}</p>
			<img src={country.flags.png} alt={country.name.common}/>
			<h2>Languages</h2>
			<ul>
				{languagesList}
			</ul>
		</div>
	)
}

const Result = ({countries, handleClick}) => {
	if (countries.length < 11 && countries.length !== 1) {
		return countries.map(country => <li onClick={handleClick(country.name.common)} key={country.name.common} >{country.name.common}</li>)
		} else if (countries.length > 10) {
		return <p>too many matches, be more specific</p>
	} else if (countries.length === 1) {
		return <CountryCard country={countries[0]} />
	}
}


const SearchCountry = ({countries}) => {

	const [searchResult, setSearchResult] = useState([])

	const handleClick = (selected) => {
		setSearchResult(selected);
	}

	const searchCountry = (event) => {
		const name = event.target.value;
		let result = countries
			.filter(country => country.name.common.toLowerCase()
			.includes(name.toLowerCase()));
		
		setSearchResult(result);
		if (event.target.value === "") {
			setSearchResult([])
		}
	}


	return (
		<div>
			<form>
				search country: <input onChange={searchCountry}/>
				<br></br>
			</form>
			search result:
			<ul>
				<Result countries={searchResult} handleClick={handleClick}/>
			</ul>
		</div>
	)
}

export default SearchCountry;