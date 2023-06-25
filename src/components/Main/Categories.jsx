import React from 'react';
import styled from 'styled-components';

import { filterNotesByTag, filterNotesBySearch, sortMotes } from '../../helpers/selectors';
import Tag from './Tag';

export default function Categories({ notes, setNotesToShow }) {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [notesTags, setNotesTags] = React.useState(() => initNotesTags(notes));
	const [sortType, setSortType] = React.useState([{ sortBy: 'date', reverse: false }]);

	function initNotesTags(notes) {
		let tagsSet = new Set();
		// iterate through all notes and add all tags to the set
		notes.forEach(note =>
			note.tags.forEach(tag => {
				tagsSet.add(tag);
			})
		);
		// Create an object where each tag is a key and its corresponding value is set to false,
		// indicating that the tag is initially not selected
		const tagsObj = Object.fromEntries([...tagsSet].map(item => [item, false]));
		return tagsObj;
	}

	const filterNotesBySearchCallback = React.useCallback(filterNotesBySearch, [searchTerm]);

	React.useEffect(() => {
		const tempNotes = [...notes];
		const notesFilteredByTags = filterNotesByTag(tempNotes, notesTags);
		const notesFilteredBySearch = filterNotesBySearchCallback(notesFilteredByTags, searchTerm);
		const sortedNotes = sortMotes(notesFilteredBySearch, sortType);
		setNotesToShow(sortedNotes);
	}, [notes, notesTags, searchTerm, sortType, filterNotesBySearchCallback, setNotesToShow]);

	const tagClickHandler = e => {
		const tagName = e.target.textContent;
		const newTags = { ...notesTags };
		newTags[tagName] = !newTags[tagName];
		setNotesTags({ ...newTags });
	};

	const sortClickHandler = e => {
		const selectedSort = e.target.textContent;
		setSortType({ sortBy: selectedSort, ...sortType });
	};

	return (
		<CategoriesLayoutStyle>
			<label htmlFor='search'>Search </label>
			<input
				type='text'
				id='search'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<h2>
				Sort by:
				<span onClick={() => setSortType({ ...sortType, reverse: !sortType.reverse })}>
					{sortType.reverse ? '+' : '-'}
				</span>
			</h2>
			<div onClick={sortClickHandler}>Date</div>
			<div onClick={sortClickHandler}>Lexical</div>
			<h2>Tags</h2>
			{Object.keys(notesTags).map((tag, i) => (
				<Tag
					key={i}
					clickHandler={tagClickHandler}
					tagName={tag}
					isSelected={notesTags[tag]}
				/>
			))}
			<h3
				onClick={() => {
					setNotesTags(initNotesTags(notes));
					setSearchTerm('');
				}}
			>
				reset
			</h3>
		</CategoriesLayoutStyle>
	);
}

const CategoriesLayoutStyle = styled.div`
	width: 20vw;
`;
