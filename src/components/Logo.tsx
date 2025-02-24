import { seoAltImage } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

interface LogoProps { }

const Logo: FC<LogoProps> = () => {
	return (
		<Link
			href='/'
			className="logo d-flex gap-2 align-items-center">
			<Image
				src='/logo.svg'
				alt={`${seoAltImage} | logo`}
				width={48}
				height={48}
				priority
				className=' d-none d-sm-block'
			/>
			<h2 className=''>
				<span>D</span>
				<span>K</span>
				Motors
			</h2>
		</Link>
	);
}

export default Logo;
