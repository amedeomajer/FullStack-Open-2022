const mongoose		= require('mongoose');
require('dotenv').config();

const url = process.env.URL

mongoose.connect(url)
	.then(result => {
		console.log('connected to mongoDB');
	})
	.catch((error) => {
		console.log(`error connecting to mongoDB ${error.message}`);
	})

const numberSchema = new mongoose.Schema({
	number: String,
	name: String,
	date: Date,
})

numberSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Number', numberSchema)
