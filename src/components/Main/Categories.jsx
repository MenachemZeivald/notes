import React from 'react';
import styled from 'styled-components';

import Tag from './Tag';
import useTags from '../../hooks/useTags';
import { TranslateContext } from '../../App';
import { filterNotesByTag, filterNotesBySearch, sortMotes } from '../../helpers/selectors';

export default function Categories({ notes, setNotesToShow }) {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [sortType, setSortType] = React.useState([{ sortBy: 'date', reverse: false }]);

	const [notesTags, selectTag, resetTags] = useTags(notes);

	const translate = React.useContext(TranslateContext);

	const filterNotesBySearchCallback = React.useCallback(filterNotesBySearch, [searchTerm]);

	React.useEffect(() => {
		const tempNotes = [...notes];
		const notesFilteredByTags = filterNotesByTag(tempNotes, notesTags);
		const notesFilteredBySearch = filterNotesBySearchCallback(notesFilteredByTags, searchTerm);
		const sortedNotes = sortMotes(notesFilteredBySearch, sortType);
		setNotesToShow(sortedNotes);
	}, [notes, notesTags, searchTerm, sortType, filterNotesBySearchCallback, setNotesToShow]);

	const sortClickHandler = e => {
		const selectedSort = e.target.textContent;
		setSortType({ sortBy: selectedSort, ...sortType });
	};

	return (
		<CategoriesLayoutStyle>
			<label htmlFor='search'>
				<h2>{translate('search')}</h2>
			</label>
			<input
				type='text'
				id='search'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<h2>
				{translate('sortBy')}:
				<span onClick={() => setSortType({ ...sortType, reverse: !sortType.reverse })}>
					{sortType.reverse ? '  +' : '  -'}
				</span>
			</h2>
			<div onClick={sortClickHandler}>{translate('date')}</div>
			<div onClick={sortClickHandler}>{translate('lexical')}</div>
			<h2>{translate('tags')}</h2>
			{Object.keys(notesTags).map((tag, i) => (
				<Tag key={i} clickHandler={selectTag} tagName={tag} isSelected={notesTags[tag]} />
			))}
			<h3
				onClick={() => {
					resetTags();
					setSearchTerm('');
				}}
			>
				{translate('reset')}
			</h3>
		</CategoriesLayoutStyle>
	);
}

const CategoriesLayoutStyle = styled.div`
	position: fixed;
	width: 20vw;
	padding: 16px;
	background-color: ${p => p.theme.panel};
	border-radius: 0 8px 8px 0;
`;
