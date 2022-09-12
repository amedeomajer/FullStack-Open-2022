const mongoose = require('mongoose');
require('dotenv').config();

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const url = process.env.URL;

const numberSchema = new mongoose.Schema({
	number: String,
	name: String,
	date: Date,
})

const Number = mongoose.model('Number', numberSchema)

if (process.argv[2] === process.env.PASSWORD && process.argv.length === 5) {

	mongoose
	.connect(url)
	.then((result) => {
		const number = new Number({
			number: process.argv[4],
			name: process.argv[3],
			date: new Date(),
		})
		return number.save()
	})
	.then(() => {
		console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
		return mongoose.connection.close()
	})
	.catch((err) => console.log(err))
}

if (process.argv.length === 3)
{
	mongoose
	.connect(url)
	.then((result) => {
		Number.find({}).then(result => {
			console.log('phonebook:')
			result.forEach(number => {
				console.log(`${number.name} ${number.number}`)
			})
			mongoose.connection.close()
		})
	})
}

