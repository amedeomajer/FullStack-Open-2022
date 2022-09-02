import axios from 'axios'

const Note = ({ note, setNotes, setNewNote, notes }) => {
	const removeNote = (id) => {
		axios
		.delete(`http://localhost:3001/notes/${id}`)
		.then(response => {
			console.log(response)
			setNotes(notes.filter(x => x.id !== id))
			setNewNote('');
		})
	}

	return (
		<li key={note.id}>
			{note.content}
			<button key={note.id} onClick={()=>removeNote(note.id)}>X</button>
		</li>
	)
}

export default Note