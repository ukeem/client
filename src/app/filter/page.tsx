'use client'
import Filter from '@/components/Filter';
import { useState, useEffect } from 'react';
import { Car } from '@/types/Car';
import { seoAltImage } from '@/lib/constants';
import { useCarStore } from '@/store/useCarStore';
import { CARS_DATA } from './data';

export default function FilterPage() {

	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setCars(CARS_DATA);
		setLoading(false);
	}, []);

	// console.log(cars);

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
			<Filter />
		</>
	);
}