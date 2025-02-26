import { getCars } from '@/api/cars';
import CarList from '@/components/CarList';
import HeaderInner from '@/components/HeaderInner';
import Loading from '@/components/Loading';
import { CarsProvider } from '@/context/CarsContext';
import { keywords, seoAltImage } from '@/lib/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';


export const metadata: Metadata = {
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
	title: `Каталог авто | ${seoAltImage}`,
	description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
	keywords: [`${keywords}`],
	alternates: {
		canonical: '/',
		languages: {
			'ru': '/',
		},
	},
	openGraph: {
		title: `Каталог авто | ${seoAltImage}`,
		description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
		images: ['/logo.svg'],
		locale: 'ru_RU',
		type: 'website',
	},
};

export default async function CarsPage() {

	const initialCars = await getCars(12, 0);
	return (
		<CarsProvider initialCars={initialCars}>
			<h1 className='main_title'>{`Каталог авто | ${seoAltImage}`}</h1>
			<HeaderInner />
			<CarList />
		</CarsProvider>
	);
}
