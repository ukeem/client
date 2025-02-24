import { seoAltImage } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

interface BtnProps {
	children?: React.ReactNode
	href?: string
	icon?: string
	clazz?: string
	onClick?: () => void
	type?: 'submit'
	disabled?: boolean
}

const Btn: FC<BtnProps> = ({ children, href, icon, clazz, onClick, type, disabled }) => {
	if (href) {
		return (
			<Link
				href={href}
				className={` d-flex justify-content-center align-items-center gap-2 ${clazz ? clazz : ''}`}
				target='_blank'
				onClick={onClick}
			>
				{icon &&
					<Image
						src={`/${icon}.svg`}
						alt={`${seoAltImage} | ${icon}`}
						width={20}
						height={20}
						priority
					/>
				}
				{children}
			</Link>
		);
	}

	return (
		<button
			className={`d-flex justify-content-center align-items-center gap-2 ${clazz ? clazz : ''}`}
			onClick={onClick}
			type={type || `button`}
			disabled={disabled}
		>
			{icon &&
				<Image
					src={`/${icon}.svg`}
					alt={`${seoAltImage} | ${icon}`}
					width={20}
					height={20}
					priority
				/>
			}
			{children}
		</button>
	)
}

export default Btn;
