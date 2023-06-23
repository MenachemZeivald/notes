import React from 'react';
import styled from 'styled-components';

export default function Note({ note, chooseNote }) {
	return (
		<NoteStyle>
			<h2>{note.title}</h2>
			<p>{note.text}</p>
			<div>{note?.date || 'no date to show'}</div>
			{note.tags.map((tag, index) => (
				<TagStyle key={index}>{tag}</TagStyle>
			))}
			<div onClick={() => chooseNote(note)}>Edit</div>
		</NoteStyle>
	);
}

const NoteStyle = styled.div`
	background-color: #ffff00;
	border-radius: 5px;
	padding: 10px;
	padding: 10px;
	margin: 10px 0;
`;

const TagStyle = styled.div`
	width: fit-content;
	border: 2px solid #ffae00;
	border-radius: 15px;
	padding: 5px;
`;
