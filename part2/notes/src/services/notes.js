import axios from 'axios'
const baseUrl = '/api/notes';

const getAll = () => {
	return axios.get(baseUrl)
}

const create = (newObject) => {
	return axios.post(baseUrl, newObject)
}

const deleteNote = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
		.then(response => {console.log(response)});
}

const update = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
	getAll: getAll, 
	create: create, 
	update: update,
	deleteNote: deleteNote
}