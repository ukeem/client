import { Photo } from '@/types/Car';
import type { FC } from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import { seoAltImage } from '@/lib/constants';

interface PhotosModalProps {
	photos: Photo[]
	show: boolean
	handleClose: () => void
	title: string
}

const PhotosModal: FC<PhotosModalProps> = ({ photos, show, handleClose, title }) => {
	return (
		<Modal
			show={show}
			fullscreen={true}
			onHide={handleClose}
			centered
			backdrop="static"
			scrollable={true}
		>
			<Modal.Header closeButton className=' container px-lg-0'>
				<Modal.Title className='modal_title title_photo_modal'>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className=' overflow-y-auto'>
				<div className=" container px-0">
					<div className="row">
						{photos?.map(el => (
							<div
								key={el.id}
								className="col-12 position-relative mb-2"
							>
								<Image
									src={`${process.env.NEXT_PUBLIC_API_URL}${el.photo}`}
									alt={`${seoAltImage} | ${el.id}fullscreen`}
									quality={25}
									fill
									priority
									loading='lazy'
									className=' photo_modal'
								/>
							</div>
						))}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PhotosModal;
