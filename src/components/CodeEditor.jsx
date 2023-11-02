import hljs from 'highlight.js';
import Editor from 'react-simple-code-editor';
import { cn } from '../lib/utils';
import { codeSnippets, fonts } from '../data/options';

import useCodeStore from '../store';
import { useEffect } from 'react';
import flourite from 'flourite';

function CodeEditor() {
	const store = useCodeStore();

	useEffect(() => {
		const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
		useCodeStore.setState(randomSnippet);
	}, []);

	useEffect(() => {
		if (store.autoDetectLanguage) {
			const { language } = flourite(store.code, { noUnknown: true });
			useCodeStore.setState({
				language: language.toLowerCase() || 'plaintext',
			});
		}
	}, [store.autoDetectLanguage, store.code]);
	return (
		<div
			className={cn(
				'min-w-[400px] border-2 rounded-xl shadow-2xl',
				store.darkMode ? 'bg-black/75 border-gray-600/40' : 'bg-white/75 border-gray-200/20'
			)}
			onClick={() => useCodeStore.setState({ darkMode: !store.darkMode })}
		>
			<header className='grid items-center grid-cols-6 gap-3 px-4 py-3'>
				<div className='flex gap-1.5'>
					<div className='w-3 h-3 bg-red-500 rounded-full'></div>
					<div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
					<div className='w-3 h-3 bg-green-500 rounded-full'></div>
				</div>
				<div className='flex justify-center col-span-4'>
					<input
						type='text'
						value={store.title}
						onChange={(e) => useCodeStore.setState({ title: e.target.value })}
						spellCheck={false}
						onClick={(e) => e.target.select()}
						className='text-sm font-medium text-center text-gray-400 bg-transparent focus:outline-none'
					/>
				</div>
			</header>
			<div
				className={cn(
					'px-4 pb-4',
					store.darkMode
						? 'brightness-110'
						: 'text-gray-800 brightness-50 saturate-200 contrast-200'
				)}
			>
				<Editor
					value={store.code}
					onValueChange={(code) => useCodeStore.setState({ code })}
					highlight={(code) =>
						hljs.highlight(code, { language: store.language || 'plaintext' }).value
					}
					style={{ fontFamily: fonts[store.fontStyle].name, fontSize: store.fontSize }}
					textareaClassName='focus:ouline-none'
					onClick={(e) => e.target.select()}
				/>
			</div>
		</div>
	);
}

export default CodeEditor;
