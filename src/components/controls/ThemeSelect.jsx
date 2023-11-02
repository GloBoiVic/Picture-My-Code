import { themes } from '../../data/options';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../../lib/utils';
import useStore from '../../store';

function ThemeSelect() {
	const theme = useStore((state) => state.theme);
	return (
		<div>
			<label className='block mb-2 text-xs font-medium text-neutral-400' />
			<Select value={theme} onValueChange={(theme) => useStore.setState({ theme })}>
				<SelectTrigger className='w-40'>
					<SelectValue placeholder='Select Theme' />
				</SelectTrigger>
				<SelectContent className='dark'>
					{Object.entries(themes).map(([name, theme]) => (
						<SelectItem key={name} value={name}>
							<div className='flex items-center justify-center gap-2'>
								<div className={cn('h-4 w-4 rounded-full', theme.background)}>
									<span className='ml-2 capitalize'>{name}</span>
								</div>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default ThemeSelect;
