'use client'
import Filter from '@/components/Filter';
// import { keywords, seoAltImage } from '@/lib/constants';
// import { Metadata } from 'next';
// import { getAllCars } from '@/api/cars';


// export const metadata: Metadata = {
// 	metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
// 	title: `Подбор авто по фильтру | ${seoAltImage}`,
// 	description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
// 	keywords: [`${keywords}`],
// 	alternates: {
// 		canonical: '/',
// 		languages: {
// 			'ru': '/',
// 		},
// 	},
// 	openGraph: {
// 		title: `Подбор авто по фильтру | ${seoAltImage}`,
// 		description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
// 		images: ['/logo.svg'],
// 		locale: 'ru_RU',
// 		type: 'website',
// 	},
// };

// export default async function FilterPage() {

// 	const allCars = await getAllCars();

// 	return (
// 		<>
// 			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
// 			<Filter allCars={allCars} />
// 		</>
// 	);
// }
import { useState, useEffect } from 'react';
import { Car } from '@/types/Car';
import { seoAltImage } from '@/lib/constants';
import { useCarStore } from '@/store/useCarStore';

export default function FilterPage() {

	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCars = async () => {
			setLoading(true);
			try {
				const response = await fetch("/response.json");
				if (!response.ok) throw new Error("Ошибка сети");
				const data: Car[] = await response.json();
				setCars(data);
			} catch (error) {
				console.error("Ошибка загрузки данных:", error);
			} finally {
				setLoading(false);
			}
		};

		if (cars.length === 0) {
			fetchCars();
		}
	}, [cars.length]);

	if (loading) {
		return (
			<div className="loading">
				<p>
					Пожалуйста подождите!
					<br />
					Идет загрузка всех авто...
				</p>
			</div>
		)
	}

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<Filter allCars={cars} />
		</>
	);
}