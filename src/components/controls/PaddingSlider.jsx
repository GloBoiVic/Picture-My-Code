import useCodeStore from '../../store';
import { Slider } from '../ui/slider';

function PaddingSlider() {
	const padding = useCodeStore((state) => state.padding);
	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-neutral-400'>Padding</label>
			<Slider
				className='my-5 w-44'
				value={[padding]}
				max={128}
				onValueChange={([padding]) => useCodeStore.setState({ padding })}
				step={8}
			/>
		</div>
	);
}

export default PaddingSlider;
