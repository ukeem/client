import MainSlider from '@/components/MainSlider';
import CarList from '@/components/CarList';
import { seoAltImage } from '@/lib/constants';
import Header from '@/components/Header';
import { getCars } from '@/api/cars';
import { CarsProvider } from '@/context/CarsContext';
import FilterBtn from '@/components/FilterBtn';

export default async function Home() {
	const [carListData, initialCars] = await Promise.all([
		// getCars(12, 0, 'price', 'DESC'),
		// getCars(12, 0, 'price', 'ASC'),
		getCars(12, 0),
		getCars(12, 0),
	]);

	return (
		<CarsProvider initialCars={initialCars}>
			<h1 className="main_title">{`Авто из Кореи | ${seoAltImage}`}</h1>
			<Header />
			<MainSlider />
			<FilterBtn />
			<CarList cars={carListData} />
		</CarsProvider>
	);
}
