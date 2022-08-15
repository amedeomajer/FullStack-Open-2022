import Note from "./components/Note.js";

const App = (props) => {
	const { notes } = props;
	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map(note => 
					<Note key={note.id} content={note.content} />
				)}
			</ul>
		</div>
	);
}

export default App;