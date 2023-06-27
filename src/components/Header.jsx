import React from 'react';
import styled from 'styled-components';

import { TranslateContext } from '../App';

export default function Header({ lang, toggleLang, toggleTheme }) {
	const translate = React.useContext(TranslateContext);
	const theme = true;

	const currLang = lang === 'en' ? translate('enLang') : translate('heLang');
	const secondLang = lang === 'en' ? translate('heLang') : translate('enLang');

	return (
		<HeaderContainerStyle>
			<LogoStyle>{translate('appName')}</LogoStyle>
			<SwitchersContainer>
				<LangContainer onClick={toggleLang}>
					<span>{currLang}</span>
					<lord-icon
						src='https://cdn.lordicon.com/akuwjdzh.json'
						trigger='click'
						colors={theme ? 'primary:#000' : 'primary:#ffffff'}
					></lord-icon>
					<span> {secondLang}</span>
				</LangContainer>
				<div onClick={toggleTheme}>
					<span className='material-symbols-outlined'>
						{theme ? 'light_mode' : 'dark_mode'}
					</span>
				</div>
			</SwitchersContainer>
		</HeaderContainerStyle>
	);
}

const HeaderContainerStyle = styled.div`
	width: 100vw;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${p => p.theme.header};
`;

const LogoStyle = styled.div`
	font-size: 3rem;
	font-weight: bold;
	text-align: center;
`;

const SwitchersContainer = styled.div`
	display: flex;
	gap: 18px;
	position: absolute;
	align-items: center;
	width: 100vw;
	justify-content: flex-end;
	& span:last-child {
		display: flex;
		align-items: center;
	}
	@media (max-width: 768px) {
		justify-content: space-between;
		padding: 0 8px;
	}
`;

const LangContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	& > span:first-child {
		background-color: #ffffff72;
		border-radius: 10%;
		padding: 5px;
	}
`;
