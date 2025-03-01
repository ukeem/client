
import { getCarById } from '@/api/cars';
import CarDetailSlider from '@/components/CarDetailSlider';
import CarMainInfo from '@/components/CarMainInfo';
import FavoriteLink from '@/components/FavoriteLink';
import Footer from '@/components/Footer';
import HeaderInner from '@/components/HeaderInner';
import ListOptions from '@/components/ListOptions';
import { keywords, seoAltImage, seoUrlCarPage } from '@/lib/constants';
import { Car } from '@/types/Car';
import { Metadata } from 'next';
import Script from 'next/script';

type Params = Promise<{ id: string }>

const siteUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "https://autokorean.ru/";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.autokorean.ru/";

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
	const { id } = await props.params;
	const carId = id.split('_')[0];
	if (!carId) return { title: "Автомобиль не найден" };

	const car = await getCarById(carId);
	if (!car) return { title: "Автомобиль не найден" };

	const carTitle = `${car.brand.brand} ${car.model.model} ${car.edition.edition} | ${seoAltImage}`;

	return {
		title: carTitle,
		description: `Купить ${car.brand.brand} ${car.model.model} с доставкой под ключ авто из Кореи. Лучшая цена и условия!`,
		keywords: keywords.split("\n").join(", "), // Передаем массив строк
		alternates: {
			canonical: `${siteUrl}/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`,
			languages: {
				ru: `${siteUrl}/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`,
			},
		},
		openGraph: {
			title: carTitle,
			description: `Купить ${car.brand.brand} ${car.model.model} с доставкой из Кореи.`,
			url: `${siteUrl}/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`,
			images: car.photos
				.sort((a, b) => a.photo.localeCompare(b.photo))
				.map((el) => `${apiUrl}${el.photo}`),
			locale: "ru_RU",
			type: "article",
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}


export default async function CarPage(props: { params: Params }) {
	const { id } = await props.params;
	const carId = id.split('_')[0];

	if (!carId) return <div>Автомобиль не найден</div>;

	const car: Car = await getCarById(carId);
	if (!car) return <div>Автомобиль не найден</div>;

	const carTitle = `${car.brand.brand} ${car.model.model} ${car.edition.edition}`;
	const carUrl = `${siteUrl}/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`;

	return (
		<>
			{/* Schema.org JSON-LD */}
			<Script
				id="car-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org/",
						"@type": "Vehicle",
						name: carTitle,
						brand: {
							"@type": "Brand",
							name: car.brand.brand,
						},
						model: car.model.model,
						url: carUrl,
						image: car.photos.map((el) => `${apiUrl}${el.photo}`),
						description: `Купить ${car.brand.brand} ${car.model.model} ${car.edition.edition} с доставкой из Кореи.`,
						offers: {
							"@type": "Offer",
							priceCurrency: "RUB",
							price: car.price,
							availability: "https://schema.org/InStock",
							url: carUrl,
						},
					}),
				}}
			/>
			<h1 className='main_title'>{`${car.brand.brand} ${car.model.model} ${car.edition.edition} | ${seoAltImage}`}</h1>
			<HeaderInner />
			<section className='carInfo mb-4'>
				<div className=" container">
					<div className="row">
						<div className="col-12 col-lg-8 mb-4">
							<CarDetailSlider
								photos={car.photos}
								title={`${car.brand.brand} ${car.model.model} ${car.edition.edition}`}
							/>
						</div>
						<div className="col-12 col-lg-4 mb-4 d-flex flex-column justify-content-between">
							<CarMainInfo car={car} />
						</div>
						<ListOptions options={car.options} />
					</div>
				</div>
			</section>
			<Footer />
			<FavoriteLink />
		</>
	);
}


