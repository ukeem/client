
import CarDetailSlider from '@/components/CarDetailSlider';
import CarMainInfo from '@/components/CarMainInfo';
import HeaderInner from '@/components/HeaderInner';
import ListOptions from '@/components/ListOptions';
import { getCar } from '@/lib/apiRequest';
import { keywords, seoAltImage } from '@/lib/constants';
import { Car } from '@/types/Car';
import { Metadata } from 'next';

type Params = Promise<{ id: string }>

export async function generateMetadata(props: { params: Params }) {
	const { id } = await props.params;
	const carId = id.split('_')[0];

	if (!carId) return { title: 'Автомобиль не найден' };

	const car = await getCar(carId);
	if (!car) return { title: 'Автомобиль не найден' };

	const metadata: Metadata = {
		metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
		title: `${car.brand.brand} ${car.model.model} ${car.edition.edition} | ${seoAltImage}`,
		description: `Купить ${car.brand.brand} ${car.model.model} с доставкой из Кореи. Лучшая цена и условия!`,
		keywords: [`${keywords}`],
		alternates: {
			canonical: '/',
			languages: {
				'ru': '/',
			},
		},
		openGraph: {
			title: `${car.brand.brand} ${car.model.model} ${car.edition.edition} | ${seoAltImage}`,
			description: `Купить ${car.brand.brand} ${car.model.model} с доставкой из Кореи.`,
			images: car.photos
				.sort((a, b) => a.photo.localeCompare(b.photo))
				.map((el) => `${process.env.NEXT_PUBLIC_API_URL}${el.photo}`),
			locale: 'ru_RU',
			type: 'website',
		},
	};

	return metadata
}


export default async function Page(props: { params: Params }) {
	const { id } = await props.params;
	const carId = id.split('_')[0];

	if (!carId) return <div>Автомобиль не найден</div>;

	const car: Car = await getCar(carId);
	if (!car) return <div>Автомобиль не найден</div>;

	return (
		<>
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
		</>
	);
}


