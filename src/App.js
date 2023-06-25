import React from 'react';

import useTranslate from './hooks/useTranslate';

import Header from './components/Header';
import MainLayout from './components/Main';

export const TranslateContext = React.createContext();

function App() {
	const [lang, toggleLang, translate] = useTranslate();

	return (
		<TranslateContext.Provider value={translate}>
			<Header toggleLang={toggleLang} lang={lang} />
			<MainLayout />
		</TranslateContext.Provider>
	);
}

export default App;
