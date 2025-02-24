'use client'
import type { FC } from 'react';
import Btn from './Btn';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { seoAltImage } from '@/lib/constants';

interface HeaderProps { }

const HeaderInner: FC<HeaderProps> = () => {
	const router = useRouter()
	const pathname = usePathname()

	const goBack = () => {
		router.back();

		setTimeout(() => {
			document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
		}, 100);
	};


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
									scroll={false}
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
								<Link
									href='/cars'
									className=' d-flex gap-2 align-items-center'
									scroll={false}
								>
									<Image
										src={`/catalog.svg`}
										alt={`${seoAltImage} | catalog}`}
										width={20}
										height={20}
										priority
									/>
									<span>Каталог авто</span>
								</Link>
							)}
						</div>
						<div className="col-auto d-none d-xl-block">
							<h2><span>Экспорт автомобилей из Южной Кореи</span> в Российскую Федерацию</h2>
						</div>
						<div className="col-auto">
							<div className=" d-flex align-items-center gap-2">
								{pathname === "/filter" ? (
									<Link
										href='/cars'
										className=' d-flex gap-2 align-items-center'
										scroll={false}
									>
										<span>Каталог авто</span>
										<Image
											src={`/catalog.svg`}
											alt={`${seoAltImage} | catalog}`}
											width={20}
											height={20}
											priority
										/>
									</Link>
								) : (
									<Link
										href='/filter'
										className=' d-flex gap-2 align-items-center'
										scroll={false}
									>
										<span>Фильтр</span>
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
