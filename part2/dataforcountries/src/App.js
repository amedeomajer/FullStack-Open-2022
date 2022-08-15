import { useState, useEffect } from 'react'

import SearchCountry from './components/SearchCountrie';

function App({countries}) {

	return (
		<SearchCountry countries={countries}/>
	)
}

export default App;