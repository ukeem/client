import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Btn from './Btn'
import Image from 'next/image'
import { seoAltImage } from '@/lib/constants'
import { Car } from '@/types/Car'

interface ModalRequestProps {
	requestShow: boolean
	handleCloseRequest: () => void
	car?: Car
}

export const ModalRequest = ({ requestShow, handleCloseRequest, car }: ModalRequestProps) => {

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [formdata, setFormdata] = useState({
		carName: '',
		name: '',
		phone: '',
		url: '',
		price: ''
	});

	useEffect(() => {
		setFormdata({
			...formdata,
			carName: `${car?.brand.brand} ${car?.model.model}`,
			url: `https://fem.encar.com/cars/detail/${car?.encarId}`,
			price: `${car?.price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}`
		});
	}, [car])

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormdata({ ...formdata, [e.target.name]: e.target.value });
	}

	const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, "");

		if (value.startsWith("8")) value = value.substring(1);
		if (value.length > 0 && value[0] !== "9") return;

		let formatted = "8 ";
		if (value.length > 0) formatted += `(${value.substring(0, 3)}`;
		if (value.length >= 4) formatted += `) ${value.substring(3, 6)}`;
		if (value.length >= 7) formatted += `-${value.substring(6, 8)}`;
		if (value.length >= 9) formatted += `-${value.substring(8, 10)}`;

		setFormdata({ ...formdata, phone: formatted });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Проверка, что все поля заполнены
		if (!formdata.carName.trim()) {
			alert("Введите название автомобиля");
			setLoading(false);
			return;
		}

		if (!formdata.name.trim()) {
			alert("Введите ваше имя");
			setLoading(false);
			return;
		}

		if (!formdata.phone.trim() || formdata.phone.length < 17) {
			alert("Введите корректный номер телефона");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("/telegram", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formdata),
			});

			if (!response.ok) throw new Error("Ошибка отправки");

			setSuccess(true);
			setFormdata({
				carName: '',
				name: '',
				phone: '',
				url: '',
				price: ''
			});

			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} catch (error: any) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};


	return (

		<Modal
			show={requestShow}
			fullscreen='md-down'
			onHide={handleCloseRequest}
			centered
			backdrop="static"
			scrollable={true}
		>
			<Modal.Header closeButton>
				<Modal.Title className=' fs-5'>Оставьте заявку</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h2 className=' lh-base fs-6 mb-2'>Ваш выбор <span className='text-accent'>{formdata.carName}</span></h2>
				<Image
					className='slide item_slide  mb-3 rounded-2'
					src={
						car?.photos?.length
							? `${process.env.NEXT_PUBLIC_API_URL}${car.photos
								.sort((a, b) => a.photo.localeCompare(b.photo))[0].photo}`
							: "/" // Укажите изображение-заглушку
					}

					alt={`${seoAltImage} | ${formdata.carName}`}
					width={306}
					height={184}
					quality={50}
					priority
				/>
				<form
					className='requestForm mb-5'
					onSubmit={handleSubmit}
				>
					<div className="form-floating mb-3">
						<input
							type="text"
							className="form-control"
							id="name"
							name='name'
							placeholder="Как обращаться к вам?"
							value={formdata.name}
							onChange={handleChangeName}
						/>
						<label htmlFor="name">Как обращаться к вам?</label>
					</div>
					<div className="form-floating mb-3">
						<input
							type="tel"
							className="form-control"
							id="phone"
							name='phone'
							value={formdata.phone}
							onChange={handleChangePhone}
							placeholder="8 (999) 999-99-99"
							maxLength={17}
						/>
						<label htmlFor="phone">Номер телефона 8 (999) 999-99-99</label>
					</div>
					<Btn
						type='submit'
						clazz='request_btn'
						disabled={loading}
					>
						{loading ? "Отправка..." : success ? "Отправлено" : 'Отправить заявку'}
					</Btn>
				</form>

				<h2 className=' lh-base fs-5 mb-3 text-center'>Свяжитесь с нами</h2>
				<Btn
					type='submit'
					clazz='show_more_btn mb-3 w-100 fs-6'
					disabled={loading}
					icon='wa'
				>
					WhatsApp
				</Btn>
				<Btn
					type='submit'
					clazz='show_more_btn w-100 fs-6 mb-3'
					disabled={loading}
					icon='tg'
				>
					Telegram
				</Btn>
			</Modal.Body>
		</Modal>
	)
}
