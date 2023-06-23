import React from 'react';

export default function useLang() {
	const [userLang, setUserLang] = React.useState(() => initLang());

	function initLang() {
		let langCode = localStorage.getItem('lang');
		if (langCode === 'undefined') {
			let browserLang = navigator.language || navigator.userLanguage;
			langCode = browserLang.slice(0, 2) === 'he' ? 'he' : 'en';
		}
		return langCode;
	}

	React.useEffect(() => {
		// document.documentElement.lang = userLang;
		localStorage.setItem('lang', userLang);
	}, [userLang]);

	const toggleLang = () => {
		setUserLang(currLang => (currLang === 'he' ? 'en' : 'he'));
	};

	return [userLang, toggleLang];
}
