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
	border: 2px solid ${p => p.theme.tag};
	border-radius: 15px;
	padding: 5px;
	background-color: var(${p => p.selcted && p.theme.tag});
	& > span {
		color: ${p => (p.selcted ? 'black' : 'transparent')};
	}
`;
