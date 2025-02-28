import Filter from '@/components/Filter';
import { seoAltImage } from '@/lib/constants';
import Footer from '@/components/Footer';
import FavoriteLink from '@/components/FavoriteLink';
import { Car } from '@/types/Car';

export default async function FilterPage() {

	const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/response.json`);
	const cars: Car[] = await response.json();

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<Filter allCars={cars} />
			<FavoriteLink />
		</>
	);
}