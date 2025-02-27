'use client'
import Filter from '@/components/Filter';
import { useState, useEffect, useMemo } from 'react';
import { seoAltImage } from '@/lib/constants';
import { useCarStore } from '@/store/useCarStore';
import { CARS_DATA } from './data';
import Footer from '@/components/Footer';
import FavoriteLink from '@/components/FavoriteLink';
import Image from 'next/image';

export default function FilterPage() {

	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(true);

	const memoizedCars = useMemo(() => CARS_DATA, []);

	useEffect(() => {
		setCars(memoizedCars);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [memoizedCars]);

	// console.log(cars);

	if (cars.length === 0 || loading) {
		return (
			<div className="loading">
				<div className=' d-flex flex-column justify-content-center align-items-center'>
					<Image
						src='/loading.svg'
						alt='DKMotors | Экспорт автомобилей из Южной Кореи в Россию и страны СНГ | loading'
						width={102}
						height={40}
						className='mb-4'
					/>
					<p>
						Пожалуйста подождите!
						<br />
						Идет загрузка всех авто...
					</p>
				</div>
			</div>
		)
	}

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<Filter />
			<Footer />
			<FavoriteLink />
		</>
	);
}