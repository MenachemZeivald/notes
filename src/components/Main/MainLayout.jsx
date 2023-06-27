import React from 'react';
import styled from 'styled-components';
import Categories from './Categories';
import NotesList from './NotesList';

export default function MainLayout() {
	const [notes, setNotes] = React.useState([]);
	const [notesToShow, setNotesToShow] = React.useState([...notes]);

	React.useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	React.useEffect(() => setNotesToShow([...notes]), [notes]);

	const submitNoteHandler = newNote => {
		// if the note is already in the list update it
		const noteIndex = notes.findIndex(note => note.id === newNote.id);
		if (noteIndex !== -1) {
			const newNotes = [...notes];
			newNotes[noteIndex] = newNote;
			localStorage.setItem('notes', JSON.stringify(newNotes));
			setNotes(newNotes);
			return;
		}

		setNotes([...notes, newNote]);
	};

	const deleteNote = noteId => {
		const newNotes = notes.filter(note => note.id !== noteId);
		setNotes(newNotes);
	};

	return (
		<>
			<Categories notes={notes} setNotesToShow={setNotesToShow} />
			<MainLayoutStyle>
				<NotesList
					notes={notesToShow}
					submitNoteHandler={submitNoteHandler}
					deleteNote={deleteNote}
				/>
			</MainLayoutStyle>
		</>
	);
}

const MainLayoutStyle = styled.main`
	width: 100vw;
	display: flex;
	justify-content: center;
`;
