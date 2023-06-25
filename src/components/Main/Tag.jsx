import React from 'react';
import styled from 'styled-components';

export default function Tag({ tagName, isSelected, clickHandler }) {
	return (
		<TagStyle onClick={clickHandler} selcted={isSelected}>
			{tagName}
		</TagStyle>
	);
}

const TagStyle = styled.div`
	background-color: ${({ selcted }) => (selcted ? '#00f7ff' : '#ff0')};
`;
