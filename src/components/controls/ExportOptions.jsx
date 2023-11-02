/* eslint-disable react/prop-types */
import { DownloadIcon, ImageIcon, Link2Icon, Share2Icon } from '@radix-ui/react-icons';
import useCodeStore from '../../store';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toBlob, toPng, toSvg } from 'html-to-image';
import toast from 'react-hot-toast';

function ExportOptions({ targetRef }) {
	const title = useCodeStore((state) => state.title);

	const copyImage = async () => {
		const imgBlob = await toBlob(targetRef.current, {
			pixelRatio: 2,
		});
		const img = new ClipboardItem({ 'image/png': imgBlob });
		navigator.clipboard.write([img]);
	};

	const copyLink = () => {
		const state = useCodeStore.getState();
		const queryParams = new URLSearchParams({
			...state,
			code: btoa(state.code),
		}).toString();
		navigator.clipboard.writeText(`${location.href}?${queryParams}`);
	};

	const saveImage = async (name, format) => {
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
					<DropdownMenuItem
						className='gap-2'
						onClick={() =>
							toast.promise(copyImage(), {
								loading: 'Copying...',
								success: 'Image copied to clipboard!',
								error: 'Something went wrong!',
							})
						}
					>
						<ImageIcon />
						Copy Image
					</DropdownMenuItem>
					<DropdownMenuItem
						className='gap-2'
						onClick={() => {
							copyLink();
							toast.success('Link copied to clipboard');
						}}
					>
						<Link2Icon />
						Copy Link
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className='gap-2'
						onClick={() =>
							toast.promise(saveImage(title, 'PNG'), {
								loading: 'Exporting PNG image...',
								success: 'Export successfully',
								error: 'Something went wrong!',
							})
						}
					>
						<DownloadIcon />
						Save as PNG
					</DropdownMenuItem>
					<DropdownMenuItem
						className='gap-2'
						onClick={() =>
							toast.promise(saveImage(title, 'SVG'), {
								loading: 'Exporting SVG image...',
								success: 'Export successfully',
								error: 'Something went wrong!',
							})
						}
					>
						<DownloadIcon />
						Save as SVG
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default ExportOptions;
