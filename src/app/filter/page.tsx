import Filter from '@/components/Filter';
import { seoAltImage } from '@/lib/constants';
import FavoriteLink from '@/components/FavoriteLink';
// import { Car } from '@/types/Car';
import { getAllCars, getDataFileJSON } from '@/api/cars';
// import { Suspense } from 'react';
// import Loading from './loading';

export default async function FilterPage() {

	// const cars: Car[] = await getDataFileJSON();
	const cars = await getAllCars();

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<Filter allCars={cars} />
			<FavoriteLink />
		</>
	);
}