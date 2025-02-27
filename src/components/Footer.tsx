import { seoAltImage } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { Container, Row } from 'react-bootstrap';

interface FooterProps { }

const Footer: FC<FooterProps> = () => {
	return (
		<>
			<section className='privilege py-5'>
				<Container>
					<h2 className=' mb-5 text-center text-md-start  text-uppercase info_title'>НАШИ ПРЕИМУЩЕСТВА</h2>
					<Row className=' mb-4'>
						<div className=" col-12 col-md-6 col-lg-3 mb-4">
							<div className="privilege_item_top d-flex align-items-center gap-3 gap-md-4 justify-content-between">
								<span className='privilege_item_top_count d-flex flex-shrink-0 justify-content-center align-items-center rounded-circle'>1</span>
								<span className='privilege_item_top_text'>Тщательный осмотр кузова и салона</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 col-lg-3 mb-4">
							<div className="privilege_item_top d-flex align-items-center gap-3 gap-md-4 justify-content-between">
								<span className='privilege_item_top_count d-flex flex-shrink-0 justify-content-center align-items-center rounded-circle'>2</span>
								<span className='privilege_item_top_text'>Проверка лакокрасочного покрытия</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 col-lg-3 mb-4">
							<div className="privilege_item_top d-flex align-items-center gap-3 gap-md-4 justify-content-between">
								<span className='privilege_item_top_count d-flex flex-shrink-0 justify-content-center align-items-center rounded-circle'>3</span>
								<span className='privilege_item_top_text'>Полная техническая диагностика</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 col-lg-3 mb-4">
							<div className="privilege_item_top d-flex align-items-center gap-3 gap-md-4 justify-content-between">
								<span className='privilege_item_top_count d-flex flex-shrink-0 justify-content-center align-items-center rounded-circle'>4</span>
								<span className='privilege_item_top_text'>Компьютерная проверка на наличие ошибок</span>
							</div>
						</div>
					</Row>
					<Row>
						<div className=" col-12 col-md-6 mb-4">
							<div className="privilege_item_bottom px-3 px-md-4 py-2 d-flex gap-3 gap-md-4 align-items-center">
								<Image
									src={`/privilege.svg`}
									alt={`${seoAltImage} | privilege`}
									width={24}
									height={24}
									priority
								/>
								<span className='privilege_item_bottom_text'>Многоуровневая диагностика автомобиля перед покупкой</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 mb-4">
							<div className="privilege_item_bottom px-3 px-md-4 py-2 d-flex gap-3 gap-md-4 align-items-center">
								<Image
									src={`/privilege.svg`}
									alt={`${seoAltImage} | privilege`}
									width={24}
									height={24}
									priority
								/>
								<span className='privilege_item_bottom_text'>Безопасность и оперативность – мы обеспечиваем надежную покупку и доставку автомобилей в кратчайшие сроки</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 mb-4">
							<div className="privilege_item_bottom px-3 px-md-4 py-2 d-flex gap-3 gap-md-4 align-items-center">
								<Image
									src={`/privilege.svg`}
									alt={`${seoAltImage} | privilege`}
									width={24}
									height={24}
									priority
								/>
								<span className='privilege_item_bottom_text'>Прозрачность – никаких скрытых платежей или дополнительных комиссий.</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 mb-4">
							<div className="privilege_item_bottom px-3 px-md-4 py-2 d-flex gap-3 gap-md-4 align-items-center">
								<Image
									src={`/privilege.svg`}
									alt={`${seoAltImage} | privilege`}
									width={24}
									height={24}
									priority
								/>
								<span className='privilege_item_bottom_text'>Полное сопровождение клиента – от подбора авто до логистики и растаможки.</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 mb-4">
							<div className="privilege_item_bottom px-3 px-md-4 py-2 d-flex gap-3 gap-md-4 align-items-center">
								<Image
									src={`/privilege.svg`}
									alt={`${seoAltImage} | privilege`}
									width={24}
									height={24}
									priority
								/>
								<span className='privilege_item_bottom_text'>Автомобиль “под ключ” – получаете готовый к эксплуатации транспорт без дополнительных вложений.</span>
							</div>
						</div>
						<div className=" col-12 col-md-6 mb-4">
							<div className="privilege_item_bottom px-3 px-md-4 py-2 d-flex gap-3 gap-md-4 align-items-center">
								<Image
									src={`/privilege.svg`}
									alt={`${seoAltImage} | privilege`}
									width={24}
									height={24}
									priority
								/>
								<span className='privilege_item_bottom_text'>Только сертифицированные автомобили с чистой историей и с минимальным пробегом по Корее.</span>
							</div>
						</div>
					</Row>
				</Container>
			</section>
			<section className='mission py-5'>
				<Container>
					<h2 className=' mb-5 text-center text-md-start text-uppercase info_title'>Наша миссия</h2>
					<Row>
						<div className=" col-12 col-lg-4 mb-4">
							<div className="mission_item d-flex align-items-center gap-3 gap-lg-4">
								<div className="mission_item_icon flex-shrink-0 rounded-circle d-flex  justify-content-center align-items-center">
									<Image
										src={`/mission_1.svg`}
										alt={`${seoAltImage} | mission_1`}
										width={24}
										height={24}
										priority
									/>
								</div>
								<span className='mission_item_text'>Поставлять автомобили с гарантированно чистыми документами</span>
							</div>
						</div>
						<div className=" col-12 col-lg-4 mb-4">
							<div className="mission_item d-flex align-items-center gap-3 gap-lg-4">
								<div className="mission_item_icon flex-shrink-0 rounded-circle d-flex  justify-content-center align-items-center">
									<Image
										src={`/mission_2.svg`}
										alt={`${seoAltImage} | mission_2`}
										width={24}
										height={24}
										priority
									/>
								</div>
								<span className='mission_item_text'>Обеспечивать покупку без скрытых расходов и дополнительных затрат.</span>
							</div>
						</div>
						<div className=" col-12 col-lg-4 mb-4">
							<div className="mission_item d-flex align-items-center gap-3 gap-lg-4">
								<div className="mission_item_icon flex-shrink-0 rounded-circle d-flex  justify-content-center align-items-center">
									<Image
										src={`/mission_3.svg`}
										alt={`${seoAltImage} | mission_3`}
										width={24}
										height={24}
										priority
									/>
								</div>
								<span className='mission_item_text'>Доставлять автомобили в максимально короткие сроки</span>
							</div>
						</div>
					</Row>
				</Container>
			</section>
			<section className='contacts py-5'>
				<Container>
					<h2 className=' mb-5 text-center text-md-start text-uppercase info_title'>Присоединяйтесь к нам!</h2>
					<Row>
						<div className=" col-9 mx-auto col-lg-3 mb-4">
							<Link
								href={'https://t.me/DKmotors_korea_auto'}
								rel='nofollow'
								target='_blank'
								className="contacts_item d-flex align-items-center gap-3">
								<div className="contacts_item_icon flex-shrink-0 rounded-circle d-flex  justify-content-center align-items-center">
									<Image
										src={`/tg_chanel.svg`}
										alt={`${seoAltImage} | tg_chanel`}
										width={24}
										height={24}
										priority
									/>
								</div>
								<span className='contacts_item_text'>Telegram-канал</span>
							</Link>
						</div>
						<div className=" col-9 mx-auto col-lg-3 mb-4">
							<Link
								href={'https://www.instagram.com/dkmotors.export/#'}
								rel='nofollow'
								target='_blank'
								className="contacts_item d-flex align-items-center gap-3">
								<div className="contacts_item_icon flex-shrink-0 rounded-circle d-flex  justify-content-center align-items-center">
									<Image
										src={`/insta.svg`}
										alt={`${seoAltImage} | insta`}
										width={24}
										height={24}
										priority
									/>
								</div>
								<span className='contacts_item_text'>Instagram</span>
							</Link>
						</div>
						<div className=" col-9 mx-auto col-lg-3 mb-4">
							<Link
								href={'https://t.me/DKMOTORS_KOREA'}
								rel='nofollow'
								target='_blank'
								className="contacts_item d-flex align-items-center gap-3"
							>
								<div className="contacts_item_icon flex-shrink-0 rounded-circle d-flex  justify-content-center align-items-center">
									<Image
										src={`/tg_c.svg`}
										alt={`${seoAltImage} | tg_c`}
										width={24}
										height={24}
										priority
									/>
								</div>
								<span className='contacts_item_text'>Telegram</span>
							</Link>
						</div>
						<div className=" col-9 mx-auto col-lg-3 mb-4">
							<Link
								href={'https://wa.me/821050451011'}
								className="contacts_item d-flex align-items-center gap-3">
								<div className="contacts_item_icon flex-shrink-0 rounded-circle d-flex  justify-content-center align-items-center">
									<Image
										src={`/wa.svg`}
										alt={`${seoAltImage} | wa`}
										width={24}
										height={24}
										priority
									/>
								</div>
								<span className='contacts_item_text'>WhatsApp</span>
							</Link>
						</div>
					</Row>
				</Container>
			</section>
		</>
	);
}

export default Footer;
