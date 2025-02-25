import CarList from '@/components/CarList';
import HeaderInner from '@/components/HeaderInner';
import { keywords, seoAltImage } from '@/lib/constants';
import { Metadata } from 'next';


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

export default async function Cars() {

	return (
		<>
			<h1 className='main_title'>{`Каталог авто | ${seoAltImage}`}</h1>
			<HeaderInner />
			{/* <Filter cars={cars} /> */}
			<CarList />
		</>
	);
}
