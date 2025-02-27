import Image from 'next/image'
import Link from 'next/link'


const SuccessPage = () => {
	return (
		<section
			className=' vw-100 d-flex justify-content-center align-items-center'
			style={{ height: 'calc(100vh - 80px)' }}
		>
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-4 mx-auto text-center">
						<div
							className=" d-flex flex-column gap-2 align-items-center justify-content-center"
							style={{ paddingBottom: '80px' }}
						>
							<Image
								src='/logo.svg'
								alt='logo'
								width={150}
								height={150}
								priority
								className='mb-3'
							/>
							<h2 className=' text-accent'>Спасибо за заявку!</h2>
							<h5 className=' lh-base fw-normal mb-4'>Мы свяжемся с вами в ближайшее время</h5>
							<Link
								href='/'
								className='global_error_btn w-100'
								style={{ maxWidth: '350px' }}
							>
								Вернуться на главную
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SuccessPage