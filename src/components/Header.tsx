import type { FC } from 'react';
import Logo from './Logo';
import Image from 'next/image';
import Link from 'next/link';
import { seoAltImage } from '@/lib/constants';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
	return (
		<>
			<header className='header mb-4' id='header'>
				<div className=" container">
					<div className="row justify-content-between align-items-center flex-nowrap">
						<div className="col-auto">
							<Logo />
						</div>
						<div className="col-auto d-none d-xl-block">
							<h2><span>Экспорт автомобилей из Южной Кореи</span> в Российскую Федерацию</h2>
						</div>
						<div className="col-auto">
							<div className=" d-flex align-items-center gap-3">
								{/* <Link
									href='/cars'
									className=' d-flex gap-2 align-items-center'
								>
									<span>Каталог авто</span>
									<Image
										src={`/catalog.svg`}
										alt={`${seoAltImage} | catalog}`}
										width={20}
										height={20}
										priority
									/>
								</Link> */}

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
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
