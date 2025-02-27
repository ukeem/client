'use client';
import AdminPanel from '@/components/AdminPanel';
import { useEffect, useMemo, useState } from 'react';
import { getLocal } from '@/lib/fn';
import { useCarStore } from '@/store/useCarStore';
import { Car } from '@/types/Car';
import Loading from '../loading';
import { CARS_DATA } from '../filter/data';

export default function Dashboard() {
	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const role = getLocal('role');
		if (role !== 'ADMIN' || !role) {
			window.location.href = '/';
		}
	}, []);

	const memoizedCars = useMemo(() => CARS_DATA, []);

	useEffect(() => {
		setCars(memoizedCars);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [memoizedCars]);

	if (loading) {
		return <Loading />;
	}

	return <AdminPanel allCars={cars} />;
}
