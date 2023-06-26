import React from 'react';

import useTranslate from './hooks/useTranslate';

import Header from './components/Header';
import MainLayout from './components/Main';
import GlobalStyle from './GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme';
import useToggle from './hooks/useToggle';

export const TranslateContext = React.createContext();

function App() {
	const [isDarkThemeEnable, toggleTheme] = useToggle(false);
	const [lang, toggleLang, translate] = useTranslate();

	return (
		<ThemeProvider theme={isDarkThemeEnable ? darkTheme : lightTheme}>
			<GlobalStyle />
			<TranslateContext.Provider value={translate}>
				<Header toggleLang={toggleLang} toggleTheme={toggleTheme} lang={lang} />
				<MainLayout />
			</TranslateContext.Provider>
		</ThemeProvider>
	);
}

export default App;
