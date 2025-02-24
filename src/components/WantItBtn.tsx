import React from 'react'
import Btn from './Btn'

interface WantItBtnProps {
	onClick: () => void
}

export const WantItBtn = ({ onClick }: WantItBtnProps) => {
	return (
		<Btn
			onClick={onClick}
			clazz=' w-100 car_btn_order mb-2'
			icon='quest'
		>
			<span>Хочу такую же!</span>
		</Btn>
	)
}
