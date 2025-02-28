'use client';
import AdminPanel from '@/components/AdminPanel';
import { useEffect, useMemo, useState } from 'react';
import { getLocal } from '@/lib/fn';
import { useCarStore } from '@/store/useCarStore';
import Loading from '../loading';

export default function Dashboard() {
	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(cars.length === 0);

	useEffect(() => {
		const role = getLocal('role');
		if (role !== 'ADMIN' || !role) {
			window.location.href = '/login';
		}
	}, []);

	useEffect(() => {
		if (cars.length > 0) return;

		fetch("/response.json") // Загружаем JSON из public/
			.then((res) => res.json())
			.then((data) => {
				setCars(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Ошибка загрузки данных:", err);
				setLoading(false);
			});
	}, [cars.length]);

	if (loading) {
		return <Loading />;
	}

	return <AdminPanel allCars={cars} />;
}
