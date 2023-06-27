import React from 'react';
import ShowEditorToggle from './ShowEditorToggle';
import useToggle from '../../hooks/useToggle';
import Editor from './Editor';
import Note from './Note';
import styled from 'styled-components';

export default function NotesList({ notes, submitNoteHandler, deleteNote }) {
	const [showEditor, toggleEditor] = useToggle(false);
	const [noteToEdit, setNoteToEdit] = React.useState(null);

	const chooseNoteToEdit = note => {
		setNoteToEdit(note);
		toggleEditor();
	};

	return (
		<>
			<NotesContainerStyle>
				{notes.map(note => (
					<Note key={note.id} note={note} chooseNote={chooseNoteToEdit} />
				))}
			</NotesContainerStyle>
			<ShowEditorToggle
				toggle={() => {
					toggleEditor();
					setNoteToEdit(null);
				}}
				isEditorOpen={showEditor}
			/>
			{showEditor && (
				<Editor
					note={noteToEdit}
					submitHandler={submitNoteHandler}
					showEditorToggle={toggleEditor}
					deleteNote={deleteNote}
				/>
			)}
		</>
	);
}

const NotesContainerStyle = styled.div`
	width: 50vw;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
	grid-template-rows: auto;
	@media (max-width: 768px) {
		width: 100%;
		grid-template-columns: repeat(2, 1fr);
		padding: 5vw;
	}
`;
