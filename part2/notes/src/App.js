import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [importance, setImportance] = useState(true);


	useEffect(() => {
		noteService
			.getAll()
			.then(response => {
				setNotes(response.data)
			})
	}, [])

	const notesToShow = showAll ? notes : notes.filter(
		note => note.important === true
	)

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: importance,
		}
		noteService
			.create(noteObject)
			.then(response => {
				setNotes(notes.concat(response.data));
				setNewNote('');
			});
		
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	}

	const handleImportance = (event) => {
		if (event.target.value === 'true')
			setImportance(true);
		else
			setImportance(false);
		
	}

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all' }
				</button>
			</div>
			<ul>
				{notesToShow.map(note => 
					<Note key={note.id} note={note} setNotes={setNotes} setNewNote={setNewNote} notes={notes}/>
				)}
			</ul>
			<form onSubmit={addNote}>
				<input onChange={handleNoteChange} value={newNote}/>
				<select onChange={handleImportance}>
					<option value={true}>important</option>
					<option value={false}>unimportant</option>
				</select>
				<button type='submit'>save</button>
			</form>
		</div>
	)
}

export default App 
