import { useState } from "react"

const SearchCountry = ({countries}) => {

	const [searchResult, setSearchResult] = useState([])

	const searchCountry = (event) => {
		const name = event.target.value;
		let result = countries
			.filter(country => country.name.common.toLowerCase()
			.includes(name.toLowerCase()));
		console.log('this is results', result, 'result is an object!')
		console.log(result[0]);
	}


	return (
		<form>
			search country: <input onChange={searchCountry}/>
		</form>
	)
}

export default SearchCountry

/*
<h1>{country.name}</h1>
br
<p>Capital: {country.capital}</p>
<p>Area: {country.area}</p>
br
<h3>languages</h3>
<ul>
	<li>{country.languages}</li>
</ul>
<img src='url("country.flag")'>
*/ 