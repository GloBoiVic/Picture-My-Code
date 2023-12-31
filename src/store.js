import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCodeStore = create(
	persist(
		() => ({
			code: '',
			title: 'Picture-My-Code',
			theme: 'oceanic',
			darkMode: true,
			showBackground: true,
			language: 'plaintext',
			autoDetectLanguage: false,
			fontSize: 18,
			fontStyle: 'jetBrainsMono',
			padding: 64,
		}),
		{
			name: 'user-preferences',
		}
	)
);

export default useCodeStore;
