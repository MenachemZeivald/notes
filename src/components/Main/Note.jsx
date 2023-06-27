import React from 'react';
import styled from 'styled-components';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Tag from './Tag';

export default function Note({ note, chooseNote }) {
	const [noteColor, setNoteColor] = React.useState(note?.color);
	return (
		<NoteStyle color={noteColor}>
			<input type='color' value={noteColor} onChange={e => setNoteColor(e.target.value)} />
			<h2>{note.title}</h2>
			<ReactMarkdown>{note.text}</ReactMarkdown>
			<div>{note.date}</div>
			{note.tags.map((tag, i) => (
				<Tag key={i} tagName={tag} />
			))}
			<div onClick={() => chooseNote(note)}>Edit</div>
		</NoteStyle>
	);
}

const NoteStyle = styled.div`
	background-color: ${p => p.color || p.theme.note};
	border-radius: 5px;
	padding: 10px;
	padding: 10px;
	margin: 10px 0;
	position: relative;

	& > input {
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

	& > input::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	& > input::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
	}
`;
