import MainSlider from '@/components/MainSlider';
import CarList from '@/components/CarList';
import { seoAltImage } from '@/lib/constants';
import Header from '@/components/Header';
import { getCars } from '@/api/cars';
import FilterBtn from '@/components/FilterBtn';
import Script from 'next/script';
import Footer from '@/components/Footer';
import FavoriteLink from '@/components/FavoriteLink';

export const revalidate = 3600

export default async function Home() {
	const [carListData, initialCars] = await Promise.all([
		getCars(9, 0, 'price', 'DESC'),
		getCars(9, 0, 'mileage', 'ASC'),
	]);

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
			<Footer />
			<FavoriteLink />
		</>
	);
}
