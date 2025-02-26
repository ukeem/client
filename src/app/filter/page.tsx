import CarListFiltered from '@/components/CarListFiltered';
import Filter from '@/components/Filter';
import HeaderInner from '@/components/HeaderInner';
import { keywords, seoAltImage } from '@/lib/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../loading';


export const metadata: Metadata = {
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
	title: `Подбор авто по фильтру | ${seoAltImage}`,
	description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
	keywords: [`${keywords}`],
	alternates: {
		canonical: '/',
		languages: {
			'ru': '/',
		},
	},
	openGraph: {
		title: `Подбор авто по фильтру | ${seoAltImage}`,
		description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
		images: ['/logo.svg'],
		locale: 'ru_RU',
		type: 'website',
	},
};

export default async function Cars() {

	return (
		<>
			<h1 className='main_title'>{`Подбор авто по фильтру | ${seoAltImage}`}</h1>
			<HeaderInner />
			<Filter />
			<CarListFiltered />
		</>
	);
}
