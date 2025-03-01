'use client'
import React, { FC, useState } from 'react';
import { translateBody, translateColor, translateFuel, translateTransmission } from '@/lib/fn';
import { Car } from '@/types/Car';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { WantItBtn } from './WantItBtn';
import { ModalRequest } from './ModalRequest';

interface CarMainInfoProps {
	car: Car
}

const CarMainInfo: FC<CarMainInfoProps> = ({ car }) => {



	const [requestShow, setRequestShow] = useState(false);
	// const [car, setCar] = useState<Car>();
	const handleShowRequest = (car: Car) => {
		// setCar(car)
		setRequestShow(true)
	}

	const handleCloseRequest = () => {
		setRequestShow(false)
	}
	return (
		<>

			<div className=" d-flex flex-column gap-3 gap-xl-4">
				<h2 className='car_title mb-0'>{`${car.brand.brand} ${car.model.model} ${car.edition.edition}`}</h2>
				<div className=" d-flex align-items-center justify-content-between">
					{car.year <= 2023 ?
						(
							<>
								<span className='car_price'>
									{`${(Math.round(car.price / 10000) * 10000).toLocaleString('ru-RU')} ₽`}
								</span>
								<span className='car_price_key'>цена под ключ</span>
							</>
						) : (
							<span className='car_price'>Уточняйте цену</span>
						)
					}
				</div>
			</div>
			<hr />
			<div className="ps-0 ps-xl-4 row row-gap-3  row-gap-xl-4">
				<div className="col-6 col-lg-12">
					<div className=" d-flex gap-1">
						<span className='car_info_key'>Наличие:</span>
						<span className='car_info_value'>В наличии</span>
					</div>
				</div>
				<div className="col-6 col-lg-12">
					<div className=" d-flex gap-1">
						<span className='car_info_key'>Год:</span>
						<span className='car_info_value'>{`${car.year}`}</span>
					</div>
				</div>
				<div className="col-6 col-lg-12">
					<div className=" d-flex gap-1">
						<span className='car_info_key'>Пробег:</span>
						<span className='car_info_value'>{`${car.mileage.toLocaleString('ru-RU')} км`}</span>
					</div>
				</div>

				<div className="col-6 col-lg-12">
					<div className=" d-flex gap-1">
						<span className='car_info_key'>Двигатель:</span>
						<span className='car_info_value'>{`${(car.engine.engine / 1000).toFixed(1)} л`}</span>
					</div>
				</div>


				<div className="col-6 col-lg-12">
					<div className=" d-flex gap-1">
						<span className='car_info_key'>Топливо:</span>
						<span className='car_info_value'>{`${translateFuel(car.fuel.fuel)}`}</span>
					</div>
				</div>


				<div className="col-6 col-lg-12">
					<div className=" d-flex gap-1">
						<span className='car_info_key'>КПП:</span>
						<span className='car_info_value'>{`${translateTransmission(car.transmission.transmission)}`}</span>
					</div>
				</div>


				<div className="col-6 col-lg-12">
					<div className=" d-flex gap-1">
						<span className='car_info_key'>Кузов:</span>
						<span className='car_info_value'>{`${translateBody(car.body.body)}`}</span>
					</div>
				</div>


				<div className="col-6 col-lg-12">
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
					<FavoriteButton
						carId={car.encarId}
					/>
					<ShareButton />
				</div>
			</div>
			<ModalRequest
				requestShow={requestShow}
				handleCloseRequest={handleCloseRequest}
				car={car}
			/>
		</>
	);
}

export default CarMainInfo;
