import { useEffect, useRef } from 'react';
import CodeEditor from './CodeEditor';
import { cn } from './lib/utils';
import { fonts, themes } from './data/options';
import useCodeStore from './store';

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
			// theme: state.theme ? state.theme : 'oceanic',
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
		</main>
	);
}

export default App;
