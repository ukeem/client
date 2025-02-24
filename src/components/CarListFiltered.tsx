'use client'
import { translateBody, translateColor, translateFuel, translateTransmission } from '@/lib/fn';
import { useState, useCallback, FC } from "react";
import ItemSlider from './ItemSlider';
import Btn from './Btn';
import { useCarsDataStore } from '@/store/useCarsDataStore';
import { seoUrlCarPage } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import { WantItBtn } from './WantItBtn';
import { ModalRequest } from './ModalRequest';
import { Car } from '@/types/Car';

interface CarListProps {
	limit?: number;
	load?: number;
}

const CarListFiltered: FC<CarListProps> = ({ limit = 9, load = 9 }) => {

	const { carsData } = useCarsDataStore();

	const [visibleCount, setVisibleCount] = useState(limit);

	const visibleCars = carsData.slice(0, visibleCount);


	const router = useRouter()

	const handleLink = (url: string) => {
		router.push(`/cars/${url}`)
	}

	const handleShowMore = useCallback(() => {
		setVisibleCount((prev) => prev + load);
	}, [load]);


	const [requestShow, setRequestShow] = useState(false);
	const [car, setCar] = useState<Car>();
	const handleShowRequest = (car: Car) => {
		setCar(car)
		setRequestShow(true)
	}

	const handleCloseRequest = () => {
		setRequestShow(false)
	}
	return (
		<>
			<div className='cars mb-4' id='search'>
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
												<span className='car_price'>{`от ${(Math.round(car.price / 100000) * 100000).toLocaleString('ru-RU')} ₽`}</span>
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

				{visibleCount < carsData.length && (
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

			<ModalRequest
				requestShow={requestShow}
				handleCloseRequest={handleCloseRequest}
				car={car}
			/>
		</>
	);
};

export default CarListFiltered
