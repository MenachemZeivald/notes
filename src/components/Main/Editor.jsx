import React from 'react';
import styled from 'styled-components';

export default function Editor({ note, submitHandler, showEditorToggle, deleteNote }) {
	const LINE_HEIGHT = 20;

	const [title, setTitle] = React.useState(note?.title || '');
	const [text, setText] = React.useState(note?.text || '');
	const [tags, setTags] = React.useState(note?.tags || []);
	const [id, setId] = React.useState(note?.id || Math.random());

	const titleInputRef = React.useRef();
	const textInputRef = React.useRef();

	React.useEffect(() => {
		titleInputRef.current.focus();
	}, []);

	React.useEffect(() => {
		const textErea = textInputRef.current;
		const keyUpHandler = () => {
			textErea.style.height = calcHeight(text) + 'px';
		};
		textErea.addEventListener('keyup', keyUpHandler);
		return () => textErea.removeEventListener('keyup', keyUpHandler);
	}, [text]);

	const clearFields = () => {
		setTitle('');
		setText('');
		setTags([]);
		setId(Math.random());
		titleInputRef.current.focus();
	};

	function calcHeight(text) {
		let numberOfLineBreaks = (text.match(/\n/g) || []).length;
		// min-height + lines x line-height + padding + border
		let newHeight = LINE_HEIGHT + numberOfLineBreaks * LINE_HEIGHT + 12 + 2;
		return newHeight;
	}

	return (
		<Popup>
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
				<textarea
					id='text'
					ref={textInputRef}
					value={text}
					onChange={e => setText(e.target.value)}
				/>

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
		</Popup>
	);
}

const FormStyle = styled.form`
	position: fixed;
	inset: 1rem;
	display: flex;
	flex-direction: column;
	background-color: #d6b823;

	textarea {
		resize: none;
		line-height: 20px;
	}
`;

const Popup = styled.div`
	position: fixed;
	inset: 0;
	background-color: black;
`;
