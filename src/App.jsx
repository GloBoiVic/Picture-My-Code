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
import { Resizable } from 're-resizable';

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
			padding: Number(state.padding || 30),
		});
	}, []);

	return (
		<main className='flex items-center justify-center min-h-screen overflow-hidden text-white dark bg-neutral-950'>
			<link rel='stylesheet' href={themes[theme].theme} crossOrigin='anonymous' />
			<link rel='stylesheet' href={fonts[fontStyle].src} crossOrigin='anonymous' />

			<Resizable enable={{ left: true, right: true }} minWidth={padding * 2 + 400}>
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
			</Resizable>

			<Card className='fixed bottom-0 px-2 py-1 mx-6 sm:px-4 sm:py-6 sm:bottom-10 bg-neutral-900/90 backdrop-blur'>
				<CardContent className='flex flex-wrap gap-2 p-0 sm:gap-4'>
					<ThemeSelect />
					<LanguageSelect />
					<FontSelect />
					<FontSizeInput />
					<PaddingSlider />
					<BackgroundSwitch />
					<DarkModeSwitch />
					<div className='w-px bg-neutral-800' />
					<div className='place-self-center'>
						<ExportOptions targetRef={editorRef} />
					</div>
				</CardContent>
			</Card>
		</main>
	);
}

export default App;
