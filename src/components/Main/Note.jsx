import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

export default function Note({ note, chooseNote }) {
	return (
		<NoteStyle>
			<h2>{note.title}</h2>
			<p>{note.text}</p>
			<div>{note.date}</div>
			{note.tags.map((tag, i) => (
				<Tag key={i} tagName={tag} />
			))}
			<div onClick={() => chooseNote(note)}>Edit</div>
		</NoteStyle>
	);
}

const NoteStyle = styled.div`
	background-color: ${p => p.theme.note};
	border-radius: 5px;
	padding: 10px;
	padding: 10px;
	margin: 10px 0;
`;
