import { fonts } from '../../data/options';
import useCodeStore from '../../store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function FontSelect() {
	const fontStyle = useCodeStore((state) => state.fontStyle);

	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-neutral-400'>Font</label>
			<Select value={fontStyle} onValueChange={(fontStyle) => useCodeStore.setState({ fontStyle })}>
				<SelectTrigger className='w-40'>
					<SelectValue placeholder='Select Font' />
				</SelectTrigger>
				<SelectContent className='dark max-h-[500px]'>
					<SelectItem value='auto-detect'>Auto Detect</SelectItem>
					{Object.entries(fonts).map(([id, font]) => (
						<SelectItem key={id} value={id}>
							{font.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default FontSelect;
