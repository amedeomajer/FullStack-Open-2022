import noteService from '../services/notes.js'

const Note = ({ note, setNotes, setNewNote, notes}) => {
	const removeNote = (id) => {
		noteService.deleteNote()
		.then(response => {
			console.log(response)
			setNotes(notes.filter(x => x.id !== id))
			setNewNote('');
		})
	}

	return (
		<li key={note.id}>
			{note.content}
		</li>
	)
}

export default Note