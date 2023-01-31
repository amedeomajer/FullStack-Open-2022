import { useState } from 'react'

const Button = (props) => {
	return (
		<button onClick={props.handleClick}>
			{props.text}
		</button>
	)
}

const Average = (props) => {
	const average = (props.good + props.neutral + props.bad) / 3;
	if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
		return (
			<tr>
				<td>average: </td>
				<td>{average}</td>
			</tr>
		)
	} else {
		return null
	}
}

const Total = (props) => {
	if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
		return (
			<tr>
				<td>total: </td>
				<td>{props.good + props.neutral + props.bad}</td>
			</tr>
		)
		} else {
			return null
		}
}

const PositivePercentage = (props) => {
	const positive = (props.good) / (props.good + props.bad + props.neutral) * 100;
	if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
	return (
		<tr>
			<td>positive: </td><td>{positive}%</td>
		</tr>
	)
	} else {
		return null
	}
}

const StatisticsLine = (props) => {
	if (props.value > 0) {
		return (
			<tr>
				<td>{props.text}: </td>
				<td>{props.value}</td>
			</tr>
		)
	} else {
		return null;
	}
}
const NoFeedbackMessage = (props) => {
	if (props.good + props.neutral + props.bad === 0) {
		return (
			<tr>
				<td>No feedback given</td>
			</tr>
		)
	} else {
		return null
	}
}
const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>Give feedback</h1>
			<Button text="good" handleClick={() => setGood(good + 1)} />
			<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
			<Button text='bad' handleClick={() => setBad(bad + 1)} />
			<br></br>
			<h1>Statistics</h1>
			<table>
				<tbody>
					<NoFeedbackMessage good={good} neutral={neutral} bad={bad} />
					<StatisticsLine text="good" value={good} />
					<StatisticsLine text="neutral" value={neutral} />
					<StatisticsLine text="bad" value={bad} />
					<Total good={good} bad={bad} neutral={neutral}/>
					<Average good={good} bad={bad} neutral={neutral}/>
					<PositivePercentage good={good} bad={bad} neutral={neutral}/>
				</tbody>
			</table>
		</div>
	)
}

export default App
