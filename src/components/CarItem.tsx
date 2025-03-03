import { Car } from '@/types/Car'
import React from 'react'
import ItemSlider from './ItemSlider'
import { seoUrlCarPage } from '@/lib/constants'
import { translateBody, translateColor, translateFuel, translateTransmission } from '@/lib/fn'
import Link from 'next/link'

interface CarItemProps {
	car: Car
}

export const CarItem = ({ car }: CarItemProps) => {
	// function handleShowRequest(car: Car) {
	// 	throw new Error('Function not implemented.')
	// }

	return (
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
							{car.year <= 2023 ?
								(
									<>
										<span className='car_price'>
											{`от ${(Math.round(car.price / 10000) * 10000).toLocaleString('ru-RU')} ₽`}
										</span>
										<span className='car_price_key'>цена под ключ</span>
									</>
								) : (
									<span className='car_price'>Уточняйте цену</span>
								)
							}
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
					{/* <div className="row">
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
									href={`/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`}
									target={true}
								>
									<span>Детали</span>
								</Btn>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	)
}
