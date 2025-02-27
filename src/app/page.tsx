import MainSlider from '@/components/MainSlider';
import CarList from '@/components/CarList';
import { seoAltImage } from '@/lib/constants';
import Header from '@/components/Header';
import { getCars } from '@/api/cars';
import { CarsProvider } from '@/context/CarsContext';
import FilterBtn from '@/components/FilterBtn';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
	title: "Авто из Кореи | Купить авто с пробегом в Москве",
	description: "Авто из Кореи под ключ: цены, характеристики, фото. Прямые поставки. Доставка в Москву и другие города.",
	keywords: "авто из кореи, корейские автомобили, купить авто с пробегом, авто под ключ",
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: "Авто из Кореи | Купить авто с пробегом в Москве",
		description: "Авто из Кореи под ключ: цены, характеристики, фото. Прямые поставки.",
		url: "https://autokorean.ru/",
		type: "website",
		images: [{ url: '/no_image.jpg', width: 1200, height: 630, alt: "Авто из Кореи" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Авто из Кореи | Купить авто с пробегом",
		description: "Большой выбор автомобилей из Кореи с доставкой в Россию.",
		images: ['/no_image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

// export const ogImage = async () => {
// 	return new ImageResponse(
// 		(
// 			<div
// 				style={{
// 					fontSize: 50,
// 					background: "black",
// 					color: "white",
// 					width: "100%",
// 					height: "100%",
// 					display: "flex",
// 					alignItems: "center",
// 					justifyContent: "center",
// 				}}
// 			>
// 				Авто из Кореи
// 			</div>
// 		),
// 		{
// 			width: 1200,
// 			height: 630,
// 		}
// 	);
// };

export const revalidate = 3600

export default async function Home() {
	const [carListData, initialCars] = await Promise.all([
		getCars(12, 0, 'price', 'DESC'),
		getCars(12, 0, 'mileage', 'ASC'),
	]);

	return (
		<CarsProvider>
			<Script
				id="homepage-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: "Авто из Кореи",
						description: "Продажа авто из Кореи. Доставка, подбор, гарантия.",
						url: "https://example.com/",
						potentialAction: {
							"@type": "SearchAction",
							target: "https://example.com/cars?search={query}",
							"query-input": "required name=query",
						},
					}),
				}}
			/>
			<h1 className="main_title">{`Авто из Кореи | ${seoAltImage}`}</h1>
			<Header />
			<MainSlider allCars={initialCars} />
			<FilterBtn />
			<CarList allCars={carListData} />
		</CarsProvider>
	);
}
