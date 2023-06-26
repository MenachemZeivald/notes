import React from 'react';
import styled from 'styled-components';
import Categories from './Categories';
import NotesList from './NotesList';

export default function MainLayout() {
	const [notes, setNotes] = React.useState([
		{
			id: 1,
			title: 'First Note',
			text: 'This is a note',
			date: new Date().toLocaleString('en-DE'),
			tags: ['important', 'personal'],
		},
		{
			id: 2,
			title: 'Second Note',
			text: 'This is another note',
			date: new Date().toLocaleString('en-DE'),
			tags: ['important', 'work'],
		},
	]);
	const [notesToShow, setNotesToShow] = React.useState([...notes]);
	// React.useEffect(() => {
	// const savedNotes = JSON.parse(localStorage.getItem('notes'));
	// if (savedNotes) {
	// 	setNotes(savedNotes);
	// }
	// }, []);

	React.useEffect(() => setNotesToShow([...notes]), [notes]);

	const submitNoteHandler = newNote => {
		// if the note is already in the list update it
		const noteIndex = notes.findIndex(note => note.id === newNote.id);
		if (noteIndex !== -1) {
			const newNotes = [...notes];
			newNotes[noteIndex] = newNote;
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
		<MainLayoutStyle>
			<Categories notes={notes} setNotesToShow={setNotesToShow} />
			<NotesList
				notes={notesToShow}
				submitNoteHandler={submitNoteHandler}
				deleteNote={deleteNote}
			/>
		</MainLayoutStyle>
	);
}

const MainLayoutStyle = styled.main`
	width: 100vw;
	display: flex;
`;
