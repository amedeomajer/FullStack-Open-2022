import { useState } from 'react'

const History = (props) => {
	let history = props.allCLicks.join(' ');
	if (props.allCLicks.length === 0)	{
		return(
			<div>

				the app is used by clicking the buttons biatch!
			</div>
		)
	}
		return (
			<div>
				History of time wasted: {history}
			</div>
		)
	
}

const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}
const App = () => {
	// useState returns an array with 
	// the current value and a function to update it
	const [left, setLeft] = useState(0);
	const [right, setRight] = useState(0);
	const [allClicks, setAll] = useState([]);

	const handleLeftClick = () => {
		setAll(allClicks.concat('L'));
		setLeft(left + 1);
	}
	
	const handleRightClick = () => {
		setAll(allClicks.concat('R'));
		setRight(right + 1);
	}
	
	return (
		<div>
			{left}
			<Button handleClick={handleLeftClick} text='left' />
			<Button handleClick={handleRightClick} text='right' />
			{right}
			<History allCLicks={allClicks}/>
		</div>
	)
}

export default App