const AddPerson = ({addName, handleNewName, handleNewNumber, newNumber, newName}) => {

	return (
		<form onSubmit={addName}>
			<div>
				name: <input onChange={handleNewName} value={newName}/>
				<br></br>
				phone: <input onChange={handleNewNumber} value={newNumber}/> 
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default AddPerson