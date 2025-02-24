import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='d-flex justify-content-center align-items-center h-75'>
			<div className=" d-flex flex-column">
				<h2 className=' text-center fs-1 fw-bolder'>404</h2>
				<p className=' text-center'>Страница не найдена</p>
				<Link href="/" className='global_error_btn'>На главную</Link>
			</div>
		</div>
	)
}