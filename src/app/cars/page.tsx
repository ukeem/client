import { getCars } from '@/api/cars';
import CarList from '@/components/CarList';
import FavoriteLink from '@/components/FavoriteLink';
import Footer from '@/components/Footer';
import HeaderInner from '@/components/HeaderInner';
import { keywords, seoAltImage } from '@/lib/constants';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "https://autokorean.ru/";

export const metadata: Metadata = {
	title: `Каталог авто | ${seoAltImage}`,
	description: "Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!",
	keywords: keywords.split("\n").join(", "), // массив строк, а не шаблон
	alternates: {
		canonical: siteUrl + "/cars",
		languages: {
			ru: siteUrl + "/cars",
		},
	},
	openGraph: {
		title: `Каталог авто | ${seoAltImage}`,
		description: "Каталог автомобилей из Южной Кореи. Заказ под ключ, доставка и растаможка в Россию. Выгодные цены и проверенные авто!",
		url: siteUrl + "/cars",
		images: [{ url: "/no_image.jpg", width: 1200, height: 630, alt: "Логотип AutoKorean" }],
		locale: "ru_RU",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function CarsPage() {
	const carListData = await getCars(9, 0, 'encarId', 'DESC');

	return (
		<>
			<h1 className="main_title">{`Каталог авто | ${seoAltImage}`}</h1>
			<HeaderInner />
			<CarList allCars={carListData} />
			<Footer />
			<FavoriteLink />
		</>
	);
}
