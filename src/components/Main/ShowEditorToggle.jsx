import React from 'react';
import styled from 'styled-components';

export default function ShowEditorToggle({ toggle, isEditorOpen }) {
	return (
		<ToggleStyle
			className='material-symbols-outlined'
			rotateBtn={isEditorOpen}
			onClick={toggle}
		>
			add
		</ToggleStyle>
	);
}

const ToggleStyle = styled.button`
	position: fixed;
	bottom: 2.5rem;
	right: 2.5rem;
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 50%;
	font-size: 2.5rem;
	z-index: 999;
	transform: rotate(${p => (p.rotateBtn ? '45deg' : '0deg')});
	transition: all 0.3s ease-in-out;
	&:hover {
		transform: scale(1.1) rotate(${p => (p.rotateBtn ? '45deg' : '0deg')});
	}
`;
