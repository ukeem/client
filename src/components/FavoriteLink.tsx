"use client";

import Link from "next/link";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import Image from 'next/image';
import { seoAltImage } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function FavoriteLink() {
	const { favoriteIds } = useFavoriteStore();
	const [count, setCount] = useState(favoriteIds.length);

	useEffect(() => {
		setCount(favoriteIds.length); // Обновляем локальный стейт при изменении favoriteIds
	}, [favoriteIds]);

	return (
		<Link
			href="/favorites"
			className={`favoriteLink d-flex justify-content-center align-items-center ${!count ? 'visually-hidden' : ''}`}
		>
			<span className=' position-relative d-flex justify-content-center align-items-center'>
				<Image
					src='/favlink.svg'
					alt={`${seoAltImage} | favlink`}
					width={36}
					height={33}
					priority
				/>
				<span className=" position-absolute count_favorite">{count}</span>
			</span>
		</Link>
	);
}
