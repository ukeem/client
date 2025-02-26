'use client'
import { FC, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import { Photo } from '@/types/Car';
import PhotosModal from './PhotosModal';
import { seoAltImage } from '@/lib/constants';

interface MainSliderProps {
	photos: Photo[]
	clazz?: string
	title?: string
}
const ItemSlider: FC<MainSliderProps> = ({ photos, clazz, title }) => {

	const [show, setShow] = useState(false)

	const handleClose = () => {
		if (show) {
			setShow(false)
		}
	}

	return (
		<>
			<Swiper
				pagination={true}
				modules={[Pagination]}
				className="itemSwiper"
			>
				{clazz &&
					<span className='clazz'>Премиум опции</span>
				}
				{/* {photos.sort((a, b) => a.photo.localeCompare(b.photo)).slice(0, 20).map((el) => (
					<SwiperSlide
						key={el.id}
						className='itemSwiperSlide'
					>
						<Image
							className='slide item_slide'
							src={`${process.env.NEXT_PUBLIC_API_URL}${el.photo}`}
							alt={`${seoAltImage} | ${el.photo}`}
							width={306}
							height={184}
							quality={75}
							loading="lazy"
							priority
							onClick={() => setShow(true)}
						/>
					</SwiperSlide>
				))} */}
				<SwiperSlide
					// key={el.id}
					className='itemSwiperSlide'
				>
					<Image
						className='slide item_slide'
						src={`${process.env.NEXT_PUBLIC_API_URL}${photos.filter(photo => photo.photo).sort((a, b) => a.photo.localeCompare(b.photo))[0].photo}`}
						alt={`${seoAltImage} | ${photos.sort((a, b) => a.photo.localeCompare(b.photo))[0].photo}`}
						width={306}
						height={184}
						quality={75}
						// loading="lazy"
						priority
						onClick={() => setShow(true)}
					/>
				</SwiperSlide>
			</Swiper>
			<PhotosModal
				show={show}
				photos={photos}
				title={title!}
				handleClose={handleClose}
			/>
		</>
	);
}

export default ItemSlider;
