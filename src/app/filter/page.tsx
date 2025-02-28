import Filter from '@/components/Filter';
import { seoAltImage } from '@/lib/constants';
import FavoriteLink from '@/components/FavoriteLink';
import { Car } from '@/types/Car';
import { getDataFileJSON } from '@/api/cars';
import { Suspense } from 'react';
import Loading from './loading';

export default async function FilterPage() {

	const cars: Car[] = await getDataFileJSON();

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<Suspense fallback={<Loading />}>
				<Filter allCars={cars} />
			</Suspense>
			<FavoriteLink />
		</>
	);
}