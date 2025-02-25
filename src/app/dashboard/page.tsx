'use client'
import AdminPanel from '@/components/AdminPanel';
import { useEffect } from 'react';
import { getLocal } from '@/lib/fn';
import { useCars } from '@/context/CarsContext';

export default function Dashboard() {
	// const [loading, setLoading] = useState(true);
	const { cars } = useCars();

	useEffect(() => {

		const role = getLocal('role')
		if (role !== 'ADMIN' || !role) {
			window.location.href = '/'
		}
	}, []); // ✅ Добавляем пустой массив зависимостей, чтобы useEffect вызывался 1 раз

	// if (loading) {
	// 	return <Loading />; // ✅ Возвращаем компонент, а не просто пустой JSX
	// }

	return <AdminPanel allCars={cars} />;
}
