import useCodeStore from '../../store';
import { Switch } from '../ui/switch';

function DarkModeSwitch() {
	const darkMode = useCodeStore((state) => state.darkMode);
	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-neutral-400'>DarkMode</label>
			<Switch
				checked={darkMode}
				onCheckedChange={(checked) => useCodeStore.setState({ darkMode: checked })}
				className='my-1.5'
			/>
		</div>
	);
}

export default DarkModeSwitch;
