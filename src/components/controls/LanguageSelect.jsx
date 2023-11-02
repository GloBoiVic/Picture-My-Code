import { MagicWandIcon } from '@radix-ui/react-icons';
import { languages } from '../../data/options';
import useCodeStore from '../../store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function LanguageSelect() {
	const language = useCodeStore((state) => state.language);
	const autoDetectLanguage = useCodeStore((state) => state.autoDetectLanguage);

	const handleChange = (language) => {
		if (language === 'auto-detect') {
			useCodeStore.setState({ autoDetectLanguage: true, language: 'plaintext' });
		} else {
			useCodeStore.setState({ autoDetectLanguage: false, language });
		}
	};
	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-neutral-400'>Language</label>
			<Select value={language} onValueChange={handleChange}>
				<SelectTrigger className='w-40'>
					{autoDetectLanguage && <MagicWandIcon className='mr-2' />}
					<SelectValue placeholder='Select Language' />
				</SelectTrigger>
				<SelectContent className='dark max-h-[500px]'>
					<SelectItem value='auto-detect'>Auto Detect</SelectItem>
					{Object.entries(languages).map(([lang, name]) => (
						<SelectItem key={lang} value={lang}>
							{name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default LanguageSelect;
