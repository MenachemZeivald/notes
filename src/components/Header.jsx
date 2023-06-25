import React from 'react';
import { TranslateContext } from '../App';

export default function Header({ lang, toggleLang }) {
	// put here theme and language switche
	const translate = React.useContext(TranslateContext);

	return (
		<>
			<div>{translate('appName')}</div>
			<div onClick={toggleLang}>change language: {lang}</div>
		</>
	);
}
