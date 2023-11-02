/* eslint-disable react/prop-types */
import { DownloadIcon, ImageIcon, Link2Icon, Share2Icon } from '@radix-ui/react-icons';
import { toBlob, toPng, toSvg } from 'html-to-image';
import toast from 'react-hot-toast';
import useCodeStore from '../../store';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

function ExportOptions({ targetRef }) {
	const title = useCodeStore((state) => state.title);

	const copyImage = async () => {
		try {
			const imgBlob = await toBlob(targetRef.current, {
				pixelRatio: 2,
			});
			const img = new ClipboardItem({ 'image/png': imgBlob });
			navigator.clipboard.write([img]);

			toast.success('Image copied to clipboard!');
		} catch (error) {
			toast.error('Something went wrong!');
		}
	};

	const copyLink = () => {
		try {
			const state = useCodeStore.getState();
			const queryParams = new URLSearchParams({
				...state,
				code: btoa(state.code),
			}).toString();
			navigator.clipboard.writeText(`${location.href}?${queryParams}`);

			toast.success('Link copied to clipboard!');
		} catch (error) {
			toast.error('Something went wrong!');
		}
	};

	const saveImage = async (name, format) => {
		try {
			let imgUrl, fileName;

			switch (format) {
				case 'PNG':
					imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
					fileName = `${name}.png`;
					break;

				case 'SVG':
					imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
					fileName = `${name}.svg`;
					break;

				default:
					return;
			}

			const a = document.createElement('a');
			a.href = imgUrl;
			a.download = fileName;
			a.click();

			toast.success('Exported successfully!');
		} catch (error) {
			toast.error('Something went wrong!');
		}
	};

	return (
		<div>
			<DropdownMenu>
				<label className='block mb-2 text-xs font-medium text-neutral-400'>Export</label>
				<DropdownMenuTrigger asChild>
					<Button>
						<Share2Icon className='mr-2' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='dark'>
					<DropdownMenuItem className='gap-2' onClick={copyImage}>
						<ImageIcon />
						Copy Image
					</DropdownMenuItem>
					<DropdownMenuItem className='gap-2' onClick={copyLink}>
						<Link2Icon />
						Copy Link
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='gap-2' onClick={() => saveImage(title, 'PNG')}>
						<DownloadIcon />
						Save as PNG
					</DropdownMenuItem>
					<DropdownMenuItem className='gap-2' onClick={() => saveImage(title, 'SVG')}>
						<DownloadIcon />
						Save as SVG
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default ExportOptions;
