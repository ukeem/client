import MainSlider from '@/components/MainSlider';
import CarList from '@/components/CarList';
import { seoAltImage } from '@/lib/constants';
import Header from '@/components/Header';
import { getCars } from '@/api/cars';
import { CarsProvider } from '@/context/CarsContext';
import FilterBtn from '@/components/FilterBtn';

export default async function Home() {
	const [carListData, initialCars] = await Promise.all([
		getCars(12, 0, 'price', 'DESC'),
		getCars(12, 0, 'mileage', 'ASC'),
	]);

	return (
		<CarsProvider>
			<h1 className="main_title">{`Авто из Кореи | ${seoAltImage}`}</h1>
			<Header />
			<MainSlider cars={initialCars} />
			<FilterBtn />
			<CarList cars={carListData} />
		</CarsProvider>
	);
}
