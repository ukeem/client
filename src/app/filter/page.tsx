import Filter from '@/components/Filter';
import { seoAltImage } from '@/lib/constants';
import FavoriteLink from '@/components/FavoriteLink';
import { getDataFileJSON } from '@/api/cars';
// import { Car } from '@/types/Car';
// import { Suspense } from 'react';
// import Loading from './loading';

export default async function FilterPage() {

	// const cars: Car[] = await getDataFileJSON();
	const cars = await getDataFileJSON();

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<Filter allCars={cars} />
			<FavoriteLink />
		</>
	);
}