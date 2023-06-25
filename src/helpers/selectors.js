import Fuse from 'fuse.js';

export function filterNotesBySearch(notes, searchTerm) {
	// my first implementation
	// return notes.filter(
	// 	note =>
	// 		note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		note.text.toLowerCase().includes(searchTerm.toLowerCase())
	// );
	searchTerm = searchTerm.trim();
	if (searchTerm === '') return notes;

	const options = {
		// includeScore: true,
		threshold: 0.3,
		keys: ['title', 'text'],
	};

	const fuse = new Fuse(notes, options);
	const result = fuse.search(searchTerm);
	return result.map(note => note.item);
}

export function filterNotesByTag(notes, tags) {
	const noTags = Object.keys(tags).length === 0;
	const noTagSelected = Object.values(tags).every(value => value === false);
	if (noTags || noTagSelected) return notes;

	const filteredNotes = [];
	for (let tag in tags) {
		if (tags[tag]) {
			const tempNotes = notes.filter(
				note => note.tags.includes(tag) && !filteredNotes.includes(note)
			);
			filteredNotes.push(...tempNotes);
		}
	}
	return filteredNotes;
}

export function sortMotes(notes, sortType) {
	if (sortType.sortBy === 'Date') {
		notes.sort((a, b) => b - a);
	}
	if (sortType.sortBy === 'Lexical') {
		notes.sort((a, b) => {
			return a.title.localeCompare(b.title);
		});
	}

	return sortType.reverse ? notes.reverse() : notes;
}
