
import FavoriteCarsList from '@/components/FavoriteCarsList';
import HeaderInner from '@/components/HeaderInner';
import Loading from '@/components/Loading';
import { keywords, seoAltImage } from '@/lib/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';


export const metadata: Metadata = {
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
	title: `Избранные авто | ${seoAltImage}`,
	description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
	keywords: [`${keywords}`],
	alternates: {
		canonical: '/',
		languages: {
			'ru': '/',
		},
	},
	openGraph: {
		title: `Избранные авто | ${seoAltImage}`,
		description: 'Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!',
		images: ['/logo.svg'],
		locale: 'ru_RU',
		type: 'website',
	},
};

export default function Cars() {

	return (
		<Suspense fallback={<Loading />}>
			<h1 className='main_title'>{`Избранные авто | ${seoAltImage}`}</h1>
			<HeaderInner />
			<FavoriteCarsList />
		</Suspense>
	);
}
