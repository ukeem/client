'use client';
import AdminPanel from '@/components/AdminPanel';
import { useEffect, useMemo, useState } from 'react';
import { getLocal } from '@/lib/fn';
import { useCarStore } from '@/store/useCarStore';
import Loading from '../loading';
import { getDataFileJSON } from '@/api/cars';

export default function Dashboard() {
	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const role = getLocal('role');
		if (role !== 'ADMIN' || !role) {
			window.location.href = '/login';
		}
	}, []);

	useEffect(() => {
		if (cars.length > 0) {
			setLoading(false);
			return;
		}

		fetchCars();
	}, [cars.length]);

	const fetchCars = async () => {
		setLoading(true);
		try {
			const data = await getDataFileJSON();
			setCars(data);
		} catch (error) {
			console.error("Ошибка загрузки автомобилей:", error);
		} finally {
			setLoading(false);
		}
	}


	if (loading) {
		return <Loading />;

	}

	return <AdminPanel allCars={cars} />;
}
