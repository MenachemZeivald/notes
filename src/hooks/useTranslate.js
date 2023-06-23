import useLang from './useLang';
import { hebrewStrings, englishStrings } from '../strings/translations';

export default function useTranslate() {
	const [userLang, setUserLang] = useLang();
	const translate = wordID => {
		if (userLang === 'he') {
			return hebrewStrings[wordID];
		}
		return englishStrings[wordID];
	};
	return [userLang, setUserLang, translate];
}
