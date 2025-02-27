"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Car } from "@/types/Car";
import Link from "next/link";
import Btn from './Btn';
import { useRouter } from 'next/navigation';
import ItemSlider from './ItemSlider';
import { seoUrlCarPage } from '@/lib/constants';
import { translateBody, translateColor, translateFuel, translateTransmission } from '@/lib/fn';
import FavoriteButton from './FavoriteButton';
import { WantItBtn } from './WantItBtn';
import { ModalRequest } from './ModalRequest';
import { useCars } from '@/context/CarsContext';
import { getAllCars } from '@/api/cars';
import { useCarStore } from '@/store/useCarStore';
import Loading from './Loading';
import HeaderInner from './HeaderInner';
import { CARS_DATA } from '@/app/filter/data';

interface FavoriteCarsListProps {
	limit?: number;
	load?: number;
}

export default function FavoriteCarsList({ limit = 9, load = 9 }: FavoriteCarsListProps) {
	const { favoriteIds } = useFavoriteStore();
	const [favoriteCars, setFavoriteCars] = useState<Car[]>([]);
	const [visibleCount, setVisibleCount] = useState(limit);
	const { cars, setCars } = useCarStore();
	const [loading, setLoading] = useState(true);
	const memoizedCars = useMemo(() => CARS_DATA, []);

	useEffect(() => {
		if (cars.length === 0) {
			setCars(memoizedCars);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [memoizedCars]);

	useEffect(() => {
		const filteredCars = cars.filter((car) => favoriteIds.includes(car.encarId));
		setFavoriteCars(filteredCars);
	}, [favoriteIds, cars]);

	const visibleCars = favoriteCars.slice(0, visibleCount);

	const router = useRouter()

	const handleLink = (url: string) => {
		router.push(`/cars/${url}`)
	}

	const handleShowMore = () => {
		setVisibleCount((prev) => prev += load);
	}

	const [requestShow, setRequestShow] = useState(false);
	const [car, setCar] = useState<Car>();
	const handleShowRequest = (car: Car) => {
		setCar(car)
		setRequestShow(true)
	}

	const handleCloseRequest = () => {
		setRequestShow(false)
	}

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<HeaderInner />
			<div>

				{favoriteCars.length === 0 ? (
					<div className=" d-flex justify-content-center">

						<p>У вас пока нет избранных автомобилей.</p>
					</div>
				) : (

					<div className='cars mb-4'>
						<div className=" container">
							<div className="row row-gap-4">
								{visibleCars.sort((a, b) => a.price - b.price).map((car) => (
									<div key={car.id} className="col-12 col-md-6 col-xl-4">
										<div className="car__item p-3 p-lg-4 d-flex flex-column gap-3">
											<div>
												<ItemSlider photos={car.photos} title={`${car.brand.brand} ${car.model.model} ${car.edition.edition}`} clazz={car.clazz ? car.clazz : undefined} />
											</div>
											<div className="car_detail d-flex flex-column">
												<Link
													href={`/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`}
													className=" d-flex flex-column gap-3"
													scroll={false}
												>
													<h2 className='car_title mb-0'>{`${car.brand.brand} ${car.model.model} ${car.edition.edition}`}</h2>
													<div className=" d-flex align-items-center justify-content-between">
														<span className='car_price'>{`от ${(Math.round(car.price / 10000) * 10000).toLocaleString('ru-RU')} ₽`}</span>
														<span className='car_price_key'>цена под ключ</span>
													</div>
												</Link>
												<hr />
												<div className="row row-gap-3">
													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>Наличие:</span>
															<span className='car_info_value'>В наличии</span>
														</div>
													</div>
													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>Год:</span>
															<span className='car_info_value'>{`${car.year}`}</span>
														</div>
													</div>
													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>Пробег:</span>
															<span className='car_info_value'>{`${car.mileage.toLocaleString('ru-RU')} км`}</span>
														</div>
													</div>

													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>Двигатель:</span>
															<span className='car_info_value'>{`${(car.engine.engine / 1000).toFixed(1)} л`}</span>
														</div>
													</div>


													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>Топливо:</span>
															<span className='car_info_value'>{`${translateFuel(car.fuel.fuel)}`}</span>
														</div>
													</div>


													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>КПП:</span>
															<span className='car_info_value'>{`${translateTransmission(car.transmission.transmission)}`}</span>
														</div>
													</div>


													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>Кузов:</span>
															<span className='car_info_value'>{`${translateBody(car.body.body)}`}</span>
														</div>
													</div>


													<div className="col-6">
														<div className=" d-flex gap-1">
															<span className='car_info_key'>Цвет:</span>
															<span className='car_info_value'>{`${translateColor(car.color.color)}`}</span>
														</div>
													</div>
												</div>
												<hr />
												<div className="row">
													<div className="col-12">
														<WantItBtn
															onClick={() => handleShowRequest(car)}
														/>
														<div className=" d-flex align-items-center gap-2">
															<FavoriteButton
																carId={car.encarId}
															/>
															<Btn
																clazz=' w-100 car_btn_detail'
																icon='info'
																onClick={() => { handleLink(`${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`) }}
															>
																<span>Детали</span>
															</Btn>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{visibleCount < favoriteCars.length && (
							<div className="container py-4 mb-5">
								<div className="row">
									<div className="mx-auto col-12 col-md-4">
										<Btn
											onClick={handleShowMore}
											icon="arrow_more"
											clazz="show_more_btn w-100"
										>
											Показать больше
										</Btn>
									</div>
								</div>
							</div>
						)}

					</div >
				)}

				<ModalRequest
					requestShow={requestShow}
					handleCloseRequest={handleCloseRequest}
					car={car!}
				/>
			</div>
		</>
	);
}
