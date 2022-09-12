import axios from 'axios'
const baseUrl = '/api/numbers'

const getAll = () => {
	return axios.get(baseUrl);
}

const createNumber = (newObject) => {
	return axios.post(baseUrl, newObject);
}

const deleteNumber = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
}

const updateNumber = (newObject, id) => {
	return axios.put(`${baseUrl}/${id}`, newObject);
}

export default {
	getAll : getAll,
	createNumber : createNumber,
	deleteNumber : deleteNumber,
	updateNumber : updateNumber
}