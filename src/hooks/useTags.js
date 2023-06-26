import React from 'react';
function useTags(notes) {
	const [tags, setTags] = React.useState(() => initNotesTags(notes));

	const resetTags = () => {
		const newTags = { ...tags };
		for (let tag in newTags) {
			newTags[tag] = false;
		}
		setTags(newTags);
	};

	const selectTag = e => {
		const htmlNodeText = e.target.textContent;
		const tagName = htmlNodeText.split(' ')[0];
		const newTags = { ...tags };
		newTags[tagName] = !newTags[tagName];
		setTags({ ...newTags });
	};

	const addTag = tag => {
		if (typeof tag !== 'object') return;
		const newTags = { ...tags, ...tag };
		setTags({ ...newTags });
	};

	return [tags, selectTag, resetTags, addTag];
}

function initNotesTags(notes) {
	const tags = {};

	// Create an object where each tag is a key and its corresponding value is set to false,
	// indicating that the tag is initially not selected
	notes.forEach(note => {
		note.tags.forEach(tag => {
			tags[tag] = false;
		});
	});

	return tags;
}

export default useTags;
