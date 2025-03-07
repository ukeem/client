'use client'
import { useEffect, type FC } from 'react';
import Btn from './Btn';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { seoAltImage } from '@/lib/constants';
import Logo from './Logo';

interface HeaderProps { }

const HeaderInner: FC<HeaderProps> = () => {
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		window.scroll(0, 0);
	}, [pathname]);


	return (
		<>
			<header className='header inner mb-2' id='header'>
				<div className=" container">
					<div className="row justify-content-between align-items-center flex-nowrap">
						<div className="col-auto">
							{pathname === "/cars" || pathname === "/filter" ? (
								<Link
									href='/'
									className=' d-flex gap-2 align-items-center'
								>
									<Image
										src={`/home.svg`}
										alt={`${seoAltImage} | home}`}
										width={20}
										height={20}
										priority
									/>
									<span>На главную</span>
								</Link>
							) : (
								// <Link
								// 	href='/cars'
								// 	className=' d-flex gap-2 align-items-center'
								// >
								// 	<Image
								// 		src={`/catalog.svg`}
								// 		alt={`${seoAltImage} | catalog}`}
								// 		width={20}
								// 		height={20}
								// 		priority
								// 	/>
								// 	<span>Каталог авто</span>
								// </Link>
								<Logo />
							)}
						</div>
						<div className="col-auto d-none d-xl-block">
							<h2><span>Экспорт автомобилей из Южной Кореи</span> в Российскую Федерацию</h2>
						</div>
						<div className="col-auto">
							<div className=" d-flex align-items-center gap-2">
								{pathname === "/filter" ? (
									// <Link
									// 	href='/cars'
									// 	className=' d-flex gap-2 align-items-center'
									// >
									// 	<span>Каталог авто</span>
									// 	<Image
									// 		src={`/catalog.svg`}
									// 		alt={`${seoAltImage} | catalog}`}
									// 		width={20}
									// 		height={20}
									// 		priority
									// 	/>
									// </Link>
									<></>
								) : (
									<Link
										href='/filter'
										className=' d-flex gap-2 align-items-center'
									>
										<span>Поиск</span>
										<Image
											src={`/search.svg`}
											alt={`${seoAltImage} | search}`}
											width={20}
											height={20}
											priority
										/>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default HeaderInner;
