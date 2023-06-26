import React from 'react';
import styled from 'styled-components';

import { TranslateContext } from '../App';
import Tag from './Tag';

export default function Editor({ note, submitHandler, showEditorToggle, deleteNote }) {
	const LINE_HEIGHT = 20;

	const [title, setTitle] = React.useState(note?.title || '');
	const [text, setText] = React.useState(note?.text || '');
	const [newTag, setNewTag] = React.useState('');
	const [tagsArr, setTagsArr] = React.useState(note?.tags || []);
	const [id, setId] = React.useState(note?.id || Math.random());

	const translate = React.useContext(TranslateContext);

	const titleInputRef = React.useRef();
	const textInputRef = React.useRef();

	React.useEffect(() => {
		titleInputRef.current.focus();
	}, []);

	React.useEffect(() => {
		const textErea = textInputRef.current;
		const keyUpHandler = () => (textErea.style.height = calcHeight(text) + 'px');
		textErea.addEventListener('keyup', keyUpHandler);
		return () => textErea.removeEventListener('keyup', keyUpHandler);
	}, [text]);

	const clearFields = () => {
		setTitle('');
		setText('');
		setTagsArr([]);
		setNewTag('');
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
						tags: tagsArr,
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
				<label htmlFor='title'>{translate('title')}</label>
				<input
					type='text'
					id='title'
					value={title}
					onChange={e => setTitle(e.target.value)}
					ref={titleInputRef}
				/>
				<label htmlFor='text'>{translate('text')}</label>
				<textarea
					id='text'
					ref={textInputRef}
					value={text}
					onChange={e => setText(e.target.value)}
				/>

				<label>{translate('tags')}</label>
				<span>click to remove</span>
				{tagsArr.map((tag, i) => (
					<Tag
						key={i}
						clickHandler={() => setTagsArr([...tagsArr.filter(t => t !== tag)])}
						tagName={tag}
					/>
				))}
				<label htmlFor='newTag'>
					<Tag clickHandler={() => setNewTag(' ')} tagName='+' />
				</label>
				{newTag && (
					<input
						type='text'
						id='newTag'
						value={newTag}
						onChange={e => setNewTag(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								e.stopPropagation();
								if (newTag.trim() === '') return;
								setTagsArr([...tagsArr, newTag]);
								setNewTag(' ');
							}
							if (e.key === 'Escape') {
								setNewTag('');
							}
						}}
					/>
				)}
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
	color: ${p => p.theme.editorText};
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
