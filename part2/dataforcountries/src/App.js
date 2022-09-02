import { useState, useEffect} from 'react'
import axios from 'axios'

const CountryCard = ({country}) => {

	const lat = country[0].latlng[0]
	const lon = country[0].latlng[1]
	const languages = Object.values(country[0].languages).map((x, i) => <li key={i}>{x}</li>)
	// const [weather, setWeather] = useState([]);
	const KEY = process.env.REACT_APP_API_KEY

	useEffect(() => {
		try {
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
			.then(response => {
				console.log(response.data.weather[0]);
				console.log('waw');
			})
		} catch (error) {
			console.log(error);
		}
	}, [])
	

	return(
		<div>
			<h1>{country[0].name.common}</h1>
			<p>Capital: {country[0].capital[0]}</p>
			<p>Population: {country[0].population}</p>
			<h3>Lanhuages:</h3>
			<ul>{languages}</ul>
			<br></br>
			<img src={country[0].flags.png} alt={country[0].name.common}/>
			<h3>Weather</h3>
		</div>
	)
}

const CountryName = ({name, handleClick}) => {
	return (
		<li>{name} <button onClick={() => handleClick({name})}>select</button></li>
	)
}

const ListCountries = ({list, handleClick}) => {

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