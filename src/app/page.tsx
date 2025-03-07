import MainSlider from '@/components/MainSlider';
import { seoAltImage } from '@/lib/constants';
import Header from '@/components/Header';
import { getCars } from '@/api/cars';
import FilterBtn from '@/components/FilterBtn';
import Script from 'next/script';
import Footer from '@/components/Footer';
import FavoriteLink from '@/components/FavoriteLink';
import CarListMain from '@/components/CarListMain';
import FilterProd from '@/components/FilterProd';
import HeaderInner from '@/components/HeaderInner';

export const revalidate = 3600

export default async function Home() {

	const randomNumber = Math.floor(Math.random() * 5001);

	// const [carListData, initialCars] = await Promise.all([
	// 	getCars(9, 0, 'price', 'DESC'),
	// 	getCars(9, randomNumber),
	// ]);

	const initialCars = await getCars(9, randomNumber)

	return (
		<>
			<Script
				id="homepage-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebPage",
						name: "Авто из Кореи",
						description: "Продажа авто из Кореи. Доставка, подбор, гарантия.",
						url: "https://autokorean.ru/",
						potentialAction: {
							"@type": "SearchAction",
							target: "https://autokorean.ru/",
							"query-input": "required name=query",
						},
					}),
				}}
			/>
			<h1 className="main_title">{`Авто из Кореи | ${seoAltImage}`}</h1>
			<MainSlider allCars={initialCars} />
			<FilterProd />
			{/* <FilterBtn /> */}
			{/* <CarListMain allCars={carListData} /> */}
		</>
	);
}
