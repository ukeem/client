'use client'
import { FC, useCallback, useEffect, useState } from 'react';
import "swiper/css";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import Btn from './Btn';
import { formatNumber, translateBody, translateColor, translateFuel, translateTransmission } from '@/lib/fn';
import { seoAltImage, seoUrlCarPage } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useCars } from '@/context/CarsContext';
import Loading from './Loading';
import Link from 'next/link';
import { Car } from '@/types/Car';
import { getCars } from '@/api/cars';

interface MainSliderProps {
	allCars: Car[];
}

const MainSlider: FC<MainSliderProps> = ({ allCars }) => {
	const router = useRouter()
	const { cars, setCars } = useCars();

	useEffect(() => {
		if (allCars.length > 0 && cars.length === 0) {
			setCars(allCars);
		}
	}, [allCars, cars.length, setCars]);

	useEffect(() => {
		let isMounted = true;

		const loadCars = async () => {
			if (allCars.length === 0 && cars.length === 0) {
				const data = await getCars(12, 0, 'mileage', 'ASC');
				if (isMounted) {
					setCars(data);
				}
			}
		};

		loadCars();

		return () => {
			isMounted = false;
		};
	}, [allCars, cars.length, setCars]);

	if (cars.length === 0) {
		return <Loading />;
	}

	return (
		<section className="container mb-4">
			<Swiper
				loop={true}
				autoplay={{
					delay: 5000,
					pauseOnMouseEnter: true,
					disableOnInteraction: false
				}}
				modules={[Autoplay]}
				className="mySwiper"
			>
				{cars.map(car => (
					<SwiperSlide
						key={car.id}
						className='mySwiperSlide'
					>
						<div className="w-100 h-100 position-relative">
							<Link
								className='slide d-block'
								href={`/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`}
							>
								<Image
									src={`${process.env.NEXT_PUBLIC_API_URL}${car.photos.sort((a, b) => a.photo.localeCompare(b.photo))[0].photo}`}
									quality={50}
									alt={`${seoAltImage} | ${car.encarId}`}
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									priority
									onClick={() => router.push(`/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`)}
								/>
							</Link>
							<div className="slide_info d-flex p-2 p-md-4 position-absolute flex-lg-column gap-0 gap-lg-3 gap-lg-4 align-items-center align-items-lg-stretch">
								<h2 className='slide_info_title mb-0'>{`${car.brand.brand} ${car.model.model} ${car.edition.edition}`}</h2>
								<div className="d-flex justify-content-between gap-4">
									<ul className='list-unstyled m-0 p-0 d-none d-lg-flex flex-column gap-3'>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>Наличие: <strong>В наличии</strong></p></li>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>Год: <strong>{car.year}</strong></p></li>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>Пробег: <strong>{`${car.mileage.toLocaleString('ru-RU')} км`}</strong></p></li>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>Двигатель: <strong>{`${formatNumber(Number(car.engine.engine))} л`}</strong></p></li>
									</ul>
									<ul className=' list-unstyled m-0 p-0 d-none d-lg-flex flex-column gap-3'>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>Топливо: <strong>{`${translateFuel(car.fuel.fuel)}`}</strong></p></li>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>КПП: <strong>{`${translateTransmission(car.transmission.transmission)}`}</strong></p></li>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>Кузов: <strong>{`${translateBody(car.body.body)}`}</strong></p></li>
										<li><p className='slide_info_detail text-nowrap lh-1 mb-0'>Цвет: <strong>{`${translateColor(car.color.color)}`}</strong></p></li>
									</ul>
									<div className=" d-flex flex-column gap-3 gap-lg-4 justify-content-between w-100">
										<div className=" d-flex flex-column align-items-end">
											<span className='slide_info_price text-nowrap lh-1'>{`${(Math.round(car.price / 10000) * 10000).toLocaleString('ru-RU')} ₽`}</span>
											<span className='slide_info_key text-nowrap lh-1'>Цена под ключ</span>
										</div>
										<Btn
											icon='auto'
											clazz='slide_info_btn d-none d-lg-flex'
											href={`/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`}
											target={true}
										>
											Заказать авто
										</Btn>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}

export default MainSlider;
