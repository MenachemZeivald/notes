import React from 'react';
import styled from 'styled-components';

export default function Tag({ tagName, isSelected, clickHandler }) {
	return (
		<TagStyle onClick={clickHandler} value={tagName} selcted={isSelected}>
			{tagName}
			<span> ✔</span>
		</TagStyle>
	);
}

const TagStyle = styled.div`
	width: fit-content;
	border: 2px solid var(--tag-color);
	border-radius: 15px;
	padding: 5px;
	background-color: var(${p => p.selcted && '--tag-color'});
	& > span {
		color: ${p => (p.selcted ? 'black' : 'transparent')};
	}
`;
