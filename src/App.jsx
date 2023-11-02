import { useEffect, useRef } from 'react';
import CodeEditor from './components/CodeEditor';
import { cn } from './lib/utils';
import { fonts, themes } from './data/options';
import useCodeStore from './store';
import { Card, CardContent } from './components/ui/card';
import ThemeSelect from './components/controls/ThemeSelect';
import ExportOptions from './components/controls/ExportOptions';
import LanguageSelect from './components/controls/LanguageSelect';
import FontSelect from './components/controls/FontSelect';
import FontSizeInput from './components/controls/FontSizeInput';
import PaddingSlider from './components/controls/PaddingSlider';
import BackgroundSwitch from './components/controls/BackgroundSwitch';
import DarkModeSwitch from './components/controls/DarkModeSwitch';

function App() {
	const theme = useCodeStore((state) => state.theme);
	const padding = useCodeStore((state) => state.padding);
	const fontStyle = useCodeStore((state) => state.fontStyle);
	const showBackground = useCodeStore((state) => state.showBackground);

	const editorRef = useRef(null);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		if (queryParams.size === 0) return;

		const state = Object.fromEntries(queryParams);

		useCodeStore.setState({
			...state,
			code: state.code ? atob(state.code) : '',
			autoDetectLanguage: state.autoDetectLanguage === 'true',
			darkMode: state.darkMode === 'true',
			fontSize: Number(state.fontSize || 18),
			padding: Number(state.padding || 64),
		});
	}, []);

	return (
		<main className='flex items-center justify-center min-h-screen text-white dark bg-neutral-950'>
			<link rel='stylesheet' href={themes[theme].theme} crossOrigin='anonymous' />
			<link rel='stylesheet' href={fonts[fontStyle].src} crossOrigin='anonymous' />
			<div
				className={cn(
					'overflow-hidden mb-2 transition-all ease-out',
					showBackground ? themes[theme].background : 'ring ring-neutral-900'
				)}
				style={{ padding }}
				ref={editorRef}
			>
				<CodeEditor />
			</div>

			<Card className='fixed px-8 py-6 mx-6 bottom-16 bg-neutral-900/90 backdrop-blur'>
				<CardContent className='flex flex-wrap items-center gap-6 p-0'>
					<ThemeSelect />
					<LanguageSelect />
					<FontSelect />
					<FontSizeInput />
					<PaddingSlider />
					<BackgroundSwitch />
					<DarkModeSwitch />
					<ExportOptions targetRef={editorRef} />
				</CardContent>
			</Card>
		</main>
	);
}

export default App;
