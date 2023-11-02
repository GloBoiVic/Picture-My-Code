import useCodeStore from '../../store';
import { Switch } from '../ui/switch';

function BackgroundSwitch() {
	const showBg = useCodeStore((state) => state.showBackground);
	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-neutral-400'>Background</label>
			<Switch
				checked={showBg}
				onCheckedChange={(checked) => useCodeStore.setState({ showBackground: checked })}
				className='my-1.5'
			/>
		</div>
	);
}

export default BackgroundSwitch;
