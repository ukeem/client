import Image from 'next/image';

export default function Loading() {
	return (
		<div className="loading">
			<Image
				src='/loading.svg'
				alt='DKMotors | Экспорт автомобилей из Южной Кореи в Россию и страны СНГ | loading'
				width={102}
				height={40}
			/>
		</div>
	);
}
