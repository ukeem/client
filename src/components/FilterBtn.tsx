'use client'
import { useEffect, useState, type FC } from 'react'; import Btn from './Btn';
import { usePathname } from 'next/navigation';


const FilterBtn: FC = () => {

	const [isFixed, setIsFixed] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		if (pathname !== "/") return; // Добавляем фикс только на главной

		const handleScroll = () => {
			setIsFixed(window.scrollY > 810);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pathname]);




	return (
		<>
			<div className={`emptyBlock ${isFixed ? "fix" : ""}`}></div>
			<div className={`btn_filter ${isFixed ? "fix" : ""}`}>
				<div className=" container mb-4">
					<div className=" row">
						<div className="col-12 col-md-4 mx-auto">
							<Btn
								clazz='filter_submit_btn'
								icon='look'
								type='submit'
								href='/filter'
								target={true}
							>
								Поиск по фильтру
							</Btn>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default FilterBtn;
