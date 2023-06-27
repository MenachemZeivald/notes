import React from 'react';
import styled, { keyframes } from 'styled-components';

import { TranslateContext } from '../../App';
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

	React.useEffect(() => {
		const escKeyHandler = key => key.code === 'Escape' && showEditorToggle();
		window.addEventListener('keyup', escKeyHandler);
		return () => window.removeEventListener('keyup', escKeyHandler);
	}, [showEditorToggle]);

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
					showEditorToggle();
				}}
			>
				<h1>{translate('editor')}</h1>
				<label htmlFor='title'>
					<h2>{translate('title')}</h2>
				</label>
				<input
					type='text'
					id='title'
					value={title}
					onChange={e => setTitle(e.target.value)}
					ref={titleInputRef}
				/>
				<label htmlFor='text'>
					<h2>{translate('text')}</h2>
				</label>
				<textarea
					id='text'
					ref={textInputRef}
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<label>
					<h2>{translate('tags')}</h2>
				</label>
				<span>click to remove</span>
				{tagsArr.map((tag, i) => (
					<Tag
						key={i}
						clickHandler={() => setTagsArr([...tagsArr.filter(t => t !== tag)])}
						tagName={tag}
					/>
				))}
				<label htmlFor='newTag'>
					<Tag tagName='+' />
				</label>
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
							setNewTag('');
						}
					}}
				/>
				{!title && !text && <span>Please fill the fields</span>}
				<button type='submit' disabled={!title && !text}>
					Submit
				</button>
				<button
					onClick={() => {
						clearFields();
						deleteNote(id);
					}}
					disabled={!note?.id || (!title && !text)}
				>
					Delete
				</button>
			</FormStyle>
		</Popup>
	);
}

const FormStyle = styled.form`
	position: fixed;
	inset: 10vh 23vw;
	display: flex;
	flex-direction: column;
	background-color: ${p => p.theme.editor};
	border: 5px solid ${p => p.theme.note};
	border-radius: 10px;
	padding: 1rem;
	color: ${p => p.theme.editorText};
	box-shadow: 0 0 10px black;

	& h1 {
		text-align: center;
		margin: 0;
	}

	& > input:first-child {
		position: absolute;
		top: 10px;
		right: 10px;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		border: none;
		outline: none;
		-webkit-appearance: none;
	}

	& > input:first-child::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	& > input:first-child::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
	}

	& textarea {
		resize: none;
		line-height: 20px;
	}

	@media (max-width: 768px) {
		inset: 2vw;
		padding: 2rem;
	}
`;

const animIn = keyframes`
	to {
		transform: translateY(0vh);
	}
`;

const Popup = styled.div`
	transform: translateY(100vh);
	animation: ${animIn} 1s forwards;
	inset: 0;
	transition: transform 0.5s;
	position: fixed;
	background-color: #0000004f;
`;
