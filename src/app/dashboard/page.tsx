'use client';
import AdminPanel from '@/components/AdminPanel';
import { useEffect, useState } from 'react';
import { getLocal } from '@/lib/fn';
import { useCarStore } from '@/store/useCarStore';
import { Car } from '@/types/Car';
import Loading from '../loading';

export default function Dashboard() {
	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const role = getLocal('role');
		if (role !== 'ADMIN' || !role) {
			window.location.href = '/';
		}
	}, []);

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await fetch("/response.json");
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data: Car[] = await response.json();
				setCars(data);
			} catch (error) {
				console.error('Failed to fetch cars:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchCars();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return <AdminPanel allCars={cars} />;
}
