'use client'
import { seoAltImage } from '@/lib/constants'
import { Option } from '@/types/Car'
import Image from 'next/image'
import { FC } from 'react'

interface ListOptionsProps {
	options: Option[]
}

const ListOptions: FC<ListOptionsProps> = ({ options }) => {
	return (
		<>
			<div className=' col-12'>
				<hr />
				<h3 className=' mb-0'>Основные опции автомобиля</h3>
				<hr />
			</div>

			{options
				.sort((a, b) => a.option.localeCompare(b.option))
				.map(el => (
					<div
						key={el.id}
						className=' d-flex align-items-baseline align-items-lg-center gap-2 option col-12 col-md-6 col-xl-4'
					>
						<Image
							src={`/option.svg`}
							alt={`${seoAltImage} | option`}
							width={14}
							height={14}
							priority
						/>
						{el.option}
					</div>
				))}
		</>
	)
}

export default ListOptions