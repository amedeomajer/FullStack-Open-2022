const numbersRouter = require('express').Router()
const Number = require('../models/numbers')

numbersRouter.get('/', (request, response) => {
	Number.find({}).then(numbers => {
		response.json(numbers)
	})
})

// Get ammount of numbers WORKS
numbersRouter.get('/info', (request, response) => {
	Number.find({}).then(numbers => {
		const phonebookLength = numbers.length;
	
		response.send(`<p>Phonebook hans info for ${phonebookLength} contacts.</p><br><p>${Date()}</p>`);
	})
})

numbersRouter.post('/', (request, response, next) => {
	const body = request.body

	const number = new Number({
		name: body.name,
		number: body.number,
		date: new Date()
	})

	number.save()
		.then(savedNumber => {
		response.json(savedNumber)
		})
		.catch(error => next(error))
})

numbersRouter.get('/:id', (request, response, next) => {
	Number.findById(request.params.id)
		.then((number) => {
		response.json(number)
		})
		.catch(error => next(error))
})

numbersRouter.delete('/:id', (request, response, next) => {
	Number.findByIdAndRemove(request.params.id)
		.then(() => {
		response.status(204).end()
		})
		.catch(error => next(error))
})

module.exports = numbersRouter