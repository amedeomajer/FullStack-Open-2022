const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

let notes = [
	{
		id: 1,
		content: "Stealing is easy",
		date: "2022-05-30T17:30:31.098Z",
		important: true
	},
	{
		id: 2,
		content: "House Lanniste Sucks",
		date: "2022-05-30T18:39:34.091Z",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2022-05-30T19:20:14.298Z",
		important: true
	},
	{
		id: 4,
		content: "Natalia likes Elisa di Rivombrosa",
		date: "2022-05-30T19:20:14.298Z",
		important: true
	}
];

app.get('/', (request, response) => {
	response.send('<h1>NOTES</h1>');
});

app.get('/api/notes', (request, response) => {
	response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	const note = notes.find(note => note.id === id);
	if (note) // JavaScript objects are truthy
		response.json(note);
	else  // undefined is falsy
		response.status(404).end();
})

const generateId = () => {
	const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0
	/*
	notes.map(n => n.id) creates a new array that contains all the ids of the notes.
	Math.max returns the maximum value of the numbers that are passed to it.
	However, notes.map(n => n.id) is an array so it can't directly 
	be given as a parameter to Math.max.
	The array can be transformed into individual
	numbers by using the "three dot" spread syntax ...
	*/
	return (maxId + 1);
}

app.post('/api/notes', (request, response) => {

	const body = request.body;

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		})
	}
	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generateId(),
	}

	notes = notes.concat(note);

	response.json(note);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})