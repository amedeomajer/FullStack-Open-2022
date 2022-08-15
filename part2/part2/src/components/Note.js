import React from 'react';

const Note = ({content, key}) => {
	return (
		<li key={key}>
			{content}
		</li>
	);
}

export default Note;