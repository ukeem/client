"use client"

import React, { FC, useState } from 'react'
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Photo } from '@/types/Car';
import Image from 'next/image';
import { seoAltImage } from '@/lib/constants';
import PhotosModal from './PhotosModal';

interface CarDetailSliderProps {
	photos: Photo[]
	title: string
}

const CarDetailSlider: FC<CarDetailSliderProps> = ({ photos, title }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

	const [show, setShow] = useState(false)

	const handleClose = () => {
		if (show) {
			setShow(false)
		}
	}
	return (
		<>

			<Swiper
				style={{
					'--swiper-navigation-color': '#F44336'
				} as React.CSSProperties}
				loop={true}
				navigation={true}
				freeMode={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[Thumbs, Navigation]}
				className="carDetailSlider mb-2"
			>
				{photos.sort((a, b) => a.photo.localeCompare(b.photo)).slice(0, 20).map((el) => (
					<SwiperSlide
						key={el.id}
					// className='itemSwiperSlide'
					>
						<Image
							className='slide item_slide_big'
							src={`${process.env.NEXT_PUBLIC_API_URL}${el.photo}`}
							quality={25}
							loading="lazy"
							alt={`${seoAltImage} | ${el.id}`}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority
							onClick={() => setShow(true)}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={12}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[Thumbs]}
				className="d-none d-lg-block little_swiper"
			>
				{photos.sort((a, b) => a.photo.localeCompare(b.photo)).slice(0, 20).map((el) => (
					<SwiperSlide
						key={el.id}
					// className='itemSwiperSlide'
					>
						<Image
							className='slide item_slide'
							src={`${process.env.NEXT_PUBLIC_API_URL}${el.photo}`}
							alt={`${seoAltImage} | ${el.photo}`}
							width={306}
							height={184}
							priority
						// onClick={() => setShow(true)}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<PhotosModal
				show={show}
				photos={photos}
				title={title!}
				handleClose={handleClose}
			/>
		</>
	)
}

export default CarDetailSlider