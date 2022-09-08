const { response }	= require('express');
const express		= require('express');
const app			= express();
const cors			= require('cors');



const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

let numbers = [
	{
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

app.get('/', (request, response) => {
	response.send('<h1>Phonebukkake API MF!</h1>')
})

app.get('/info', (request, response) => {
	const phonebookLength = numbers.length;

	response.send(`<p>Phonebook hans info for ${phonebookLength} contacts.</p><br><p>${Date()}</p>`);
})

app.get('/api/numbers', (request, response) => {
	response.json(numbers)
})

app.get('/api/numbers/:id', (request, response) => {
	const id = Number(request.params.id);
	const number = numbers.find(number => number.id === id);
	if (number)
		response.json(number);
	else
		response.status(404).end();
})

app.delete('/api/numbers/:id', (request, response) => {
	const id = Number(request.params.id);
	const number = numbers.find(number => number.id === id);
	if (number) {
		numbers = numbers.filter(number => number.id !== id);
		response.status(204).end();
	} else {
		response.status(404).end();
	}
})

app.post('/api/numbers', (request, response) => {
	const id = Math.floor(Math.random() * 10000);

	const duplicateName = numbers.find(number => number.name === request.body.name);
	if (!request.body.name || request.body.name === "") {
		return response.status(400).json({
			error: 'name missing'
		})
	}
	if (!request.body.number || request.body.number === "") {
		return response.status(400).json({
			error: 'number missing'
		})
	}
	if (duplicateName) {
		return response.status(400).json({
			error: 'name already exists'
		})
	}

	const number = {
		"id": id,
		"name": request.body.name,
		"number": request.body.number
	}
	numbers = numbers.concat(number);
	response.json(number);
})

const unknownEndPoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})