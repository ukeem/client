'use client'
import { seoAltImage } from '@/lib/constants'
import Image from 'next/image'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export const DangerBtn = () => {

	const [show, setShow] = useState(false)

	const handleClose = () => {
		if (show) {
			setShow(false)
		}
	}

	return (
		<>
			<button
				className='danger_btn d-flex justify-content-center align-items-center gap-3'
				onClick={() => setShow(true)}
			>
				<svg
					width={24}
					height={22}
					viewBox="0 0 20 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.8 1.61286L19.501 12.7739C20.464 14.3769 19.991 16.4859 18.444 17.4839C17.9251 17.8207 17.3197 18 16.701 17.9999H3.298C1.477 17.9999 0 16.4699 0 14.5809C0 13.9419 0.173 13.3169 0.498 12.7739L7.2 1.61286C8.162 0.00985837 10.196 -0.481142 11.743 0.516858C12.171 0.792858 12.533 1.16786 12.8 1.61286ZM10 13.9999C10.2652 13.9999 10.5196 13.8945 10.7071 13.707C10.8946 13.5194 11 13.2651 11 12.9999C11 12.7346 10.8946 12.4803 10.7071 12.2928C10.5196 12.1052 10.2652 11.9999 10 11.9999C9.73478 11.9999 9.48043 12.1052 9.29289 12.2928C9.10536 12.4803 9 12.7346 9 12.9999C9 13.2651 9.10536 13.5194 9.29289 13.707C9.48043 13.8945 9.73478 13.9999 10 13.9999ZM10 4.99986C9.73478 4.99986 9.48043 5.10522 9.29289 5.29275C9.10536 5.48029 9 5.73464 9 5.99986V9.99986C9 10.2651 9.10536 10.5194 9.29289 10.707C9.48043 10.8945 9.73478 10.9999 10 10.9999C10.2652 10.9999 10.5196 10.8945 10.7071 10.707C10.8946 10.5194 11 10.2651 11 9.99986V5.99986C11 5.73464 10.8946 5.48029 10.7071 5.29275C10.5196 5.10522 10.2652 4.99986 10 4.99986Z"
						fill="#B30D00"
					/>
				</svg>
				<span className='text-accent'>Остерегайтесь мошенников!</span>
			</button>

			<Modal
				show={show}
				fullscreen={true}
				onHide={handleClose}
				centered
				backdrop="static"
				scrollable={true}
			>
				<Modal.Header closeButton className=' container px-lg-0'>
					<Modal.Title className='modal_title title_photo_modal'>Внимание!</Modal.Title>
				</Modal.Header>
				<Modal.Body className=' overflow-y-auto '>
					<div className=" ">
						<h5 className='  text-center'><span className='text-accent'>⚠</span> Остерегайтесь мошенников!</h5>
						<p className=' fs-6 fw-light'>Уважаемые пользователи! Мы заботимся о вашей безопасности и предупреждаем о возможных мошенниках, использующих имя нашей компании.</p>
						<p>✅ <strong>Единственные официальные способы связи</strong> – это номера телефонов и мессенджеры, указанные в списке ниже. <strong>Других номеров у нас нет!</strong></p>
						<ul className=' list-unstyled ps-5'>
							<li className=' d-flex align-items-center gap-3 mb-3'>
								<Image
									src={`/wa.svg`}
									alt={`${seoAltImage} | wadanger`}
									width={16}
									height={16}
									priority
								/>
								<strong><a rel='nofollow' target="_blank" className='dangerLink' href="https://wa.me/821050451011">+82 10 5045 1011</a></strong>
							</li>
							<li className=' d-flex align-items-center gap-3 mb-3'>
								<Image
									src={`/tg_c.svg`}
									alt={`${seoAltImage} | tgdanger`}
									width={16}
									height={16}
									priority
								/>
								<strong><a rel='nofollow' target="_blank" className='dangerLink' href="https://t.me/DKMOTORS_KOREA">@dkmotors_korea</a></strong>
							</li>
							<li className=' d-flex align-items-center gap-3 mb-3'>
								<Image
									src={`/tg_chanel.svg`}
									alt={`${seoAltImage} | tg_chaneltgdanger`}
									width={16}
									height={16}
									priority
								/>
								<strong><a rel='nofollow' target="_blank" className='dangerLink' href="https://t.me/DKmotors_korea_auto">@dkmotors_korea_auto</a></strong>
							</li>
							<li className=' d-flex align-items-center gap-3 mb-3'>
								<Image
									src={`/insta.svg`}
									alt={`${seoAltImage} | instadanger`}
									width={16}
									height={16}
									priority
								/>
								<strong><a rel='nofollow' target="_blank" className='dangerLink' href="https://www.instagram.com/dkmotors.export">@dkmotors.export</a></strong>
							</li>
						</ul>
						<p>✅ <strong>Проверяйте информацию</strong> – если вам предлагают сделку от нашего имени, но условия кажутся подозрительными, обязательно свяжитесь с нами напрямую.</p>
						<p>✅ <strong>Не передавайте личные данные посторонним лицам</strong> – мошенники могут использовать их в своих целях.</p>
						<p className='text-accent'><em>Если у вас появились сомнения или вопросы – обращайтесь к нам через контактные данные, размещённые на сайте. Мы всегда готовы помочь!</em></p>
					</div>
				</Modal.Body>
			</Modal>
		</>

	)
}
