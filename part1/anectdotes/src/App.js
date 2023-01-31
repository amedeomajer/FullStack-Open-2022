import { useState } from 'react'

const Button = (props) => {
	return (
		<button onClick={props.handleClick}>
			{props.text}
		</button>
	)
}

const addVote = (array, index) => {
	let copy = [...array]; // react triggers a re render only if something changed, 
	// if we use let copy = array ("shallow copy"), we are copying the pointer to the array,
	// instead if we use [...array], we are copying the array itself into a new array to a new pointer
	// this is called "deep copy"
	copy[index]++;
	return copy;
}
const Voted = ({value}) => {
	return (
		<div>
			voted {value} times
		</div>
	)
}

const MostVotedAnecdote = ({votes, anecdotes}) => {
	const max = Math.max(...votes);
	if (max === 0)	
		return <div>No votes yet</div>
	const index = votes.indexOf(max);
	return (
		<div>
			{anecdotes[index]}
			<br></br>
			<Voted value={max}/>
		</div>
	)
}
const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
	]
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<Button text='new anecdote' handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />
			<Button text='vote' handleClick={() => setVotes(addVote(votes, selected))} />
			<Button text='fuck' handleClick={() => console.log(votes)} />
			<br></br>
			{anecdotes[selected]}
			<br></br>
			<Voted value={votes[selected]}/>
			<br></br>
			<h1>Andecdote with the most votes</h1>
			<MostVotedAnecdote votes={votes} anecdotes={anecdotes}/>
		</div>
	)
}

export default App
