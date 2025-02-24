'use client'
import AdminPanel from '@/components/AdminPanel';
import { getFilteringCars } from '@/lib/apiRequest';
import { useCarStore } from '@/store/useCarStore';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { getLocal } from '@/lib/fn';

export default function Dashboard() {
	const [loading, setLoading] = useState(true);
	const { cars, setCars } = useCarStore();

	useEffect(() => {

		const role = getLocal('role')
		if (role !== 'ADMIN' || !role) {
			window.location.href = '/'
		}
		const fetchCars = async () => {
			try {
				const data = await getFilteringCars({});
				setCars(data);
			} catch (error) {
				console.error("Ошибка загрузки машин:", error);
			} finally {
				setLoading(false); // ✅ Вызываем setLoading(false) только после запроса
			}
		};

		fetchCars();
	}, []); // ✅ Добавляем пустой массив зависимостей, чтобы useEffect вызывался 1 раз

	if (loading) {
		return <Loading />; // ✅ Возвращаем компонент, а не просто пустой JSX
	}

	return <AdminPanel allCars={cars} />;
}
