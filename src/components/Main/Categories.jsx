import React from 'react';
import styled from 'styled-components';

export default function Categories({ notes, setNotesToShow }) {
	const [tags] = React.useState(() => createTagsSet(notes));

	function createTagsSet(notes) {
		let tagsSet = new Set();
		// iterate through all notes and add all tags to the set
		notes.forEach(note =>
			note.tags.forEach(tag => {
				tagsSet.add(tag);
			})
		);
		return Array.from(tagsSet);
	}

	const filterNotesByTag = tag => {
		let filteredNotes = notes.filter(note => note.tags.includes(tag));
		setNotesToShow(filteredNotes);
	};

	return (
		<CategoriesLayoutStyle>
			<form>
				<label htmlFor='search'>Search </label>
				<input type='text' id='search' />
			</form>
			<div onClick={() => setNotesToShow([...notes])}>ALL</div>
			<div>FAVORITES</div>
			<div>tags</div>
			{tags.map((tag, i) => (
				<div key={i} onClick={() => filterNotesByTag(tag)}>
					{tag}
				</div>
			))}
		</CategoriesLayoutStyle>
	);
}

const CategoriesLayoutStyle = styled.div`
	width: 20vw;
`;
