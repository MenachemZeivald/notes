import React from 'react';
import NewNoteButton from './NewNoteButton';
import useToggle from '../../hooks/useToggle';
import Editor from './Editor';
import Note from './Note';

export default function NotesList({ notes, submitNoteHandler, deleteNote }) {
	const [showEditor, toggleEditor] = useToggle(false);
	const [noteToEdit, setNoteToEdit] = React.useState(null);

	const chooseNoteToEdit = note => {
		setNoteToEdit(note);
		toggleEditor();
	};

	return (
		<>
			<div>
				{notes.map(note => (
					<Note key={note.id} note={note} chooseNote={chooseNoteToEdit} />
				))}
			</div>
			{showEditor || (
				<NewNoteButton
					toggle={() => {
						toggleEditor();
						setNoteToEdit(null);
					}}
				/>
			)}
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
