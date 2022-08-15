// Higer order functions
//in javascript, functions are values
const triple = (x) => x * 3;
let waffle = triple;
console.log(waffle(3)); // 9
//higher order functions are functions that take other functions as arguments or return functions

let animals = [
	{ name: 'Fluffykins', species: 'rabbit' },
	{ name: 'Caro', species: 'dog' },
	{ name: 'Hamilton', species: 'dog' },
	{ name: 'Harold', species: 'fish' },
	{ name: 'Ursula', species: 'cat' },
	{ name: 'Jimmy', species: 'fish' }
]

//		filter
// filter is a function that takes a function as an argument and returns 
// a new array with all the elements that pass the test
let dogsLong = animals.filter(function(animal){
	return animal.species === 'dog';
})
console.log(dogsLong);
// [
// { name: 'Caro', species: 'dog' },
// { name: 'Hamilton', species: 'dog' }
// ]
let dogsShort = animals.filter((animal) => animal.species === 'dog')
console.log(dogsShort);
// [
// { name: 'Caro', species: 'dog' },
// { name: 'Hamilton', species: 'dog' }
// ]

//		map
// map is a function that takes a function as an argument and returns
// a new array with the results of calling the function on every 
// element in the array
let names = animals.map(function(animal){
	return animal.name;
});
console.log(names);
// [ 'Fluffykins', 'Caro', 'Hamilton', 'Harold', 'Ursula', 'Jimmy' ]
names = animals.map((x) => x.name + ' is a ' + x.species);
console.log(names);
// [
// 	'Fluffykins is a rabbit',
// 	'Caro is a dog',
// 	'Hamilton is a dog',
// 	'Harold is a fish',
// 	'Ursula is a cat',
// 	'Jimmy is a fish'
// ]

//		reduce
// reduce is a function that takes a function as an argument and returns
// a single value
let orders = [
	{ amount: 250 },
	{ amount: 400 },
	{ amount: 100 },
	{ amount: 325 }
]
let totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
console.log(totalAmount); // 1075
// import fs from 'fs';  doesnt work but dont know why
let fs = require('fs');
const output = fs.readFileSync('data.txt', 'utf8')
.trim().
split('\n').
map(row => row.trim()).
map(row => row.split('\t')).
reduce((customer, row) => {
	customer[row[0]] = customer[row[0]] || []; // assigning the existing array or otherwise creating a new one
	customer[row[0]].push({
		product: row[1],
		price: row[2],
		quantity: row[3]
	});
	return customer;
}, {});

console.log(JSON.stringify(output, null, 2))
