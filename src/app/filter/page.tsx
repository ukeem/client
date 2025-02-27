'use client'
import Filter from '@/components/Filter';
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
			{/* <Filter allCars={cars} /> */}
		</>
	);
}