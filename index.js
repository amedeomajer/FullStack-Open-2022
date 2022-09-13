require('dotenv').config();
const { response }	= require('express');
const express		= require('express');
const app			= express();
const cors			= require('cors');
const Number 		= require('./models/number')

let numbers = [];



const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(express.static('build'));

app.get('/', (request, response) => {
	response.send('<h1>Phonebukkake API MF!</h1>')
})

app.get('/info', (request, response) => {
	const phonebookLength = numbers.length;

	response.send(`<p>Phonebook hans info for ${phonebookLength} contacts.</p><br><p>${Date()}</p>`);
})

app.get('/api/numbers', (request, response) => {
	Number.find({}).then(numbers => {
		response.json(numbers)
	})
})

app.get('/api/numbers/:id', (request, response) => {
	Number.findById(request.params.id)
		.then(number => {
			if (number){
				response.json(number);
				console.log(number)
			}
			else{
				response.status(404).end();
			}
		})
		.catch(error => {
			console.log(error);
			response.status(400).send({ error: 'malformatted id' }).end()
		})
})

app.delete('/api/numbers/:id', (request, response) => {
	console.log()
	Number.findByIdAndRemove(request.params.id)
	.then(result => {
		response.status(204).end()
	})
	.catch(error => console.log(error));
	// const number = numbers.find(number => number.id === id);
	// if (number) {
	// 	numbers = numbers.filter(number => number.id !== id);
	// 	response.status(204).end();
	// } else {
	// 	response.status(404).end();
	// }
})

app.post('/api/numbers', (request, response) => {
	const body = request.body;

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

	const number = new Number({
		number: body.number,
		name: body.name,
		date: new Date(),
	})

	number.save().then((savedNumber) => {
		response.json(savedNumber)
	})
})

const unknownEndPoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})