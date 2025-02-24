import MainSlider from '@/components/MainSlider';
import { getAllCars } from '@/lib/apiRequest';
import Filter from '@/components/Filter';
import CarList from '@/components/CarList';
import { Metadata } from 'next';
import { keywords, seoAltImage } from '@/lib/constants';
import Header from '@/components/Header';

export const metadata: Metadata = {
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
	title: `Авто из Кореи | ${seoAltImage}`,
	description: 'Большой выбор авто из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Проверенные автомобили по лучшим ценам!',
	keywords: [`${keywords}`],
	alternates: {
		canonical: '/',
		languages: {
			'ru': '/',
		},
	},
	openGraph: {
		title: `Авто из Кореи | ${seoAltImage}`,
		description: 'Большой выбор авто из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Проверенные автомобили по лучшим ценам!',
		images: ['/logo.svg'],
		locale: 'ru_RU',
		type: 'website',
	},
};

export default async function Home() {

	const cars = await getAllCars()

	return (
		<>
			<h1 className='main_title'>{`Авто из Кореи | ${seoAltImage}`}</h1>
			<Header />
			<MainSlider allCars={cars} />
			<Filter cars={cars} />
			<CarList allcars={cars} />
		</>
	);
}
