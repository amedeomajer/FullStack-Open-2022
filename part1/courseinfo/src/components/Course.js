import React from 'react'

const Part = ({part}) => {
	let element = part.map(x => <p key={x.id}>{x.name} {x.exercises}</p>)
	return element
}
const Content = ({ parts }) => {
	return (<Part part={parts} />)
}

const Header = ({ course }) => {
	return (
		<h1 key={course.id}>{course.name}</h1>
	)
}

const Total = ({parts}) => {

	let total = parts.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<p>Total ammount of exercises: {total} ..mf</p>
	)
}

const Course = ({ course }) => {

	return (
		<div>
		<Header course={course} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
		</div>
	);
};

export default Course;