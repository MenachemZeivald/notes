import React from 'react';
import styled from 'styled-components';

export default function Editor({ note, submitHandler, showEditorToggle, deleteNote }) {
	const [title, setTitle] = React.useState(note?.title || '');
	const [text, setText] = React.useState(note?.text || '');
	const [tags, setTags] = React.useState(note?.tags || []);
	const [id, setId] = React.useState(note?.id || Math.random());

	const titleInputRef = React.useRef();
	React.useEffect(() => {
		titleInputRef.current.focus();
	}, []);

	const clearFields = () => {
		setTitle('');
		setText('');
		setTags([]);
		setId(Math.random());
		titleInputRef.current.focus();
	};

	return (
		<FormStyle
			onSubmit={e => {
				e.preventDefault();
				if (!title && !text) return;
				const newNote = {
					id,
					title,
					text,
					tags,
					date: new Date().toLocaleString('en-DE'),
				};
				submitHandler(newNote);
				clearFields();
			}}
		>
			<span onClick={showEditorToggle}>X</span>
			<span
				onClick={() => {
					clearFields();
					deleteNote(id);
				}}
			>
				Delete
			</span>
			<label htmlFor='title'>Title</label>
			<input
				type='text'
				id='title'
				value={title}
				onChange={e => setTitle(e.target.value)}
				ref={titleInputRef}
			/>
			<label htmlFor='text'>Text</label>
			<input type='text' id='text' value={text} onChange={e => setText(e.target.value)} />

			<label htmlFor='tags'>Tags</label>
			<input
				type='text'
				id='tags'
				disabled={true}
				value={tags}
				onChange={e => setTags(e.target.value)}
			/>
			{!title && !text && <span>Please fill the fields</span>}
			<button type='submit' disabled={!title && !text}>
				Submit
			</button>
		</FormStyle>
	);
}

const FormStyle = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: #d6b823;
`;
