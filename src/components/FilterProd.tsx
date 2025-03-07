'use client'
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import FilterModal from './FilterModal';
import { useFilterDataStore } from '@/store/useFilterDataStore';
import { Car } from '@/types/Car';
import FilterInput from './FilterInput';
import { filterTitle, isEmptyObject, translateBody, translateColor, translateFuel, translateTransmission } from '@/lib/fn';
import Btn from './Btn';
import { usePathname } from 'next/navigation';
import { seoAltImage } from '@/lib/constants';
import { useCarsDataStore } from '@/store/useCarsDataStore';
import HeaderInner from './HeaderInner';
import CarListFiltered from './CarListFiltered';
import Loading from '@/app/filter/loading';

export interface FilterProps {
	minMileage?: number;
	maxMileage?: number;
	minYear?: number;
	maxYear?: number;
	minPrice?: number;
	maxPrice?: number;
	brandIds?: number[];
	modelIds?: number[];
	editionIds?: number[];
	fuelIds?: number[];
	colorIds?: number[];
	minEngine?: number;
	maxEngine?: number;
	bodyIds?: number[];
	transmissionIds?: number[];
	optionIds?: number[];
}


export interface ModalItem {
	id: number;
	[key: string]: string | number;
}


const FilterProd = () => {
	const [brands, setBrands] = useState<ModalItem[]>([]);

	const [loading, setLoading] = useState<boolean>(true);
	const [loader, setLoader] = useState<boolean>(false);

	const { filterData, setFilterData } = useFilterDataStore();
	const { setCarsData } = useCarsDataStore();

	const [show, setShow] = useState(false);

	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalList, setModalList] = useState<ModalItem[]>([]);
	const [modalListRadio, setModalListRadio] = useState<ModalItem[]>([]);

	const [models, setModels] = useState<ModalItem[]>([]);
	const [editions, setEditions] = useState<ModalItem[]>([]);
	const [minYears, setMinYears] = useState<ModalItem[]>([]);
	const [maxYears, setMaxYears] = useState<ModalItem[]>([]);
	const [minEngines, setMinEngines] = useState<ModalItem[]>([]);
	const [maxEngines, setMaxEngines] = useState<ModalItem[]>([]);
	const [minMileages, setMinMileages] = useState<ModalItem[]>([]);
	const [maxMileages, setMaxMileages] = useState<ModalItem[]>([]);
	const [minPrice, setMinPrice] = useState<ModalItem[]>([]);
	const [maxPrice, setMaxPrice] = useState<ModalItem[]>([]);
	const [transmission, setTransmission] = useState<ModalItem[]>([]);
	const [fuel, setFuel] = useState<ModalItem[]>([]);
	const [bodies, setBodies] = useState<ModalItem[]>([]);
	const [colors, setColors] = useState<ModalItem[]>([]);
	const [options, setOptions] = useState<ModalItem[]>([]);

	const [count, setCount] = useState();

	const [isFixed, setIsFixed] = useState(false);

	const pathname = usePathname();

	const searchRef = useRef<HTMLDivElement>(null);

	const filterOptions = [
		{ key: brands, name: "Производитель" },
		{ key: models, name: "Модель" },
		{ key: editions, name: "Поколение" },
		{ key: minYears, name: "Год от", radio: true },
		{ key: maxYears, name: "Год до", radio: true },
		{ key: minEngines, name: "Двигатель от", radio: true },
		{ key: maxEngines, name: "Двигатель до", radio: true },
		{ key: minMileages, name: "Пробег от", radio: true },
		{ key: maxMileages, name: "Пробег до", radio: true },
		{ key: minPrice, name: "Цена от", radio: true },
		{ key: maxPrice, name: "Цена до", radio: true },
		{ key: transmission, name: "КПП" },
		{ key: fuel, name: "Тип топлива" },
		{ key: bodies, name: "Кузов" },
		{ key: colors, name: "Цвет" },
		{ key: options, name: "Опции" },
	];

	const fetchBrands = useCallback(async () => {

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/brands`);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/brands`);

		if (!res.ok) throw new Error("Ошибка загрузки брендов fetchBrands");

		const data: ModalItem[] = await res.json();

		setBrands(
			data
				.sort((a, b) => String(a.brand).localeCompare(String(b.brand)))
				.map(({ id, brand }) => ({ id, brand: String(brand) }))
		);

	}, []);


	//Получаем модели выбранных производителей (Models)
	const fetchModels = async (brandIds: number[]) => {

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/models`, {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/models`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ brandIds })
		});

		if (!res.ok) throw new Error("Ошибка загрузки моделей fetchModels");

		const data: any = await res.json();

		setModels(
			data.flatMap(({ brand, models }: { brand: string; models: { id: number; model: string }[] }) =>
				models.map(({ id, model }: { id: number; model: string }) => ({
					id,
					model: `(${brand}) ${model}`
				}))
			).sort((a: { model: string; }, b: { model: any; }) => a.model.localeCompare(b.model))
		);
	};


	//Получаем поколения выбранных моделей (Editions)
	const fetchEditions = async (brandIds: number[], modelIds: number[]) => {
		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/editions`, {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/editions`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ brandIds, modelIds })
		});

		if (!res.ok) throw new Error("Ошибка загрузки поколений fetchEditions");

		const data: any = await res.json();

		setEditions(
			data.flatMap(({ model, editions }: any) =>
				editions.map(({ id, edition }: any) => ({
					id,
					edition: `(${model}) ${edition}`,
				}))
			)
		);
	};


	const fetchMinYear = useCallback(async () => {
		try {
			// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/min-max-year`);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/min-max-year`);

			if (!res.ok) throw new Error("Ошибка загрузки fetchMinYear");

			const data: { minYear: number; maxYear: number } = await res.json();

			const generatedYears = Array.from({ length: data.maxYear - data.minYear + 1 }, (_, i) => ({
				id: i + 1,
				minYear: String(data.minYear + i)
			}));

			setMinYears(generatedYears);
		} catch (error) {
			console.error("Ошибка при загрузке fetchMinYear:", error);
		}
	}, []);


	const fetchMaxYear = () => {

		if (minYears.length === 0) return;

		if (!filterData.minYear) {
			setMaxYears(
				minYears
					.sort((a, b) => Number(a.minYear) - Number(b.minYear))
					.map(({ id, minYear }) => ({
						id,
						maxYear: String(minYear)
					}))
			);
			return;
		}

		setMaxYears(
			minYears
				.filter(el => Number(el.minYear) > Number(filterData.minYear))
				.sort((a, b) => Number(a.minYear) - Number(b.minYear))
				.map(({ id, minYear }) => ({
					id,
					maxYear: String(minYear)
				}))
		);

	};


	const fetchMinEngine = useCallback(async () => {
		try {
			// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/min-max-engine`);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/min-max-engine`);

			if (!res.ok) throw new Error("Ошибка загрузки fetchMinEngine");

			const data: { maxEngine: number } = await res.json();

			const step = 0.1;
			const max = data.maxEngine / 1000;



			const formatted = Array.from(
				{ length: Math.round((max - step) / step) + 1 },
				(_, i) => {
					const value = (step + i * step).toFixed(1); // Форматируем с одной цифрой после запятой
					return {
						id: i + 1,
						minEngine: value.endsWith(".0") ? String(parseFloat(value)) : value, // Убираем `.0`, если есть
					};
				}
			);


			setMinEngines(formatted);
		} catch (error) {
			console.error("Ошибка при загрузке fetchMinEngine:", error);
		}
	}, []);


	const fetchMaxEngine = () => {

		if (minEngines.length === 0) return;

		if (!filterData.minEngine) {
			setMaxEngines(
				minEngines
					.sort((a, b) => Number(a.minEngine) - Number(b.minEngine))
					.map(({ id, minEngine }) => ({
						id,
						maxEngine: String(minEngine)
					}))
			);
			return;
		}

		setMaxEngines(
			minEngines
				.filter(el => Number(el.minEngine) > Number(filterData.minEngine))
				.sort((a, b) => Number(a.minEngine) - Number(b.minEngine))
				.map(({ id, minEngine }) => ({
					id,
					maxEngine: String(minEngine)
				}))
		);

	};

	const fetchMinMileage = useCallback(async () => {
		try {
			// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/min-max-mileage`);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/min-max-mileage`);

			if (!res.ok) throw new Error("Ошибка загрузки fetchMinMileage");

			const data: { maxMileage: number } = await res.json();

			const step = 10000;
			const min = 0
			const max = Math.round(data.maxMileage / 10000) * 10000



			const formatted = Array.from(
				{ length: Math.round((max - min) / step) + 1 },
				(_, i) => ({
					id: i + 1,
					minMileage: String(min + i * step), // Правильный шаг
				})
			);

			setMinMileages(formatted);
		} catch (error) {
			console.error("Ошибка при загрузке fetchMinMileage:", error);
		}
	}, []);


	const fetchMaxMileage = () => {

		if (minMileages.length === 0) return;

		if (!filterData.minMileage) {
			setMaxMileages(
				minMileages
					.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
					.map(({ id, minMileage }) => ({
						id,
						maxMileage: String(minMileage)
					}))
			);
			return;
		}

		setMaxMileages(
			minMileages
				.filter(el => Number(el.minMileage) > Number(filterData.minMileage))
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
				.map(({ id, minMileage }) => ({
					id,
					maxMileage: String(minMileage)
				}))
		);

	};

	const fetchMinPrice = useCallback(async () => {
		try {
			// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/min-max-price`);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/min-max-price`);

			if (!res.ok) throw new Error("Ошибка загрузки fetchMinPrice");

			const data: { minPrice: number, maxPrice: number } = await res.json();

			const step = 100000;
			const min = Math.round(data.minPrice / 100000) * 100000
			const max = Math.round(data.maxPrice / 100000) * 100000

			const formatted = Array.from(
				{ length: Math.round((max - min) / step) + 1 },
				(_, i) => ({
					id: i + 1,
					minPrice: String(min + i * step), // Правильный шаг
				})
			);

			setMinPrice(formatted);
		} catch (error) {
			console.error("Ошибка при загрузке fetchMinPrice:", error);
		}
	}, []);


	const fetchMaxPrice = () => {

		if (!minPrice) return;

		if (!filterData.minPrice) {
			setMaxPrice(
				minPrice
					.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
					.map(({ id, minPrice }) => ({
						id,
						maxPrice: String(minPrice)
					}))
			);
			return;
		}

		setMaxPrice(
			minPrice
				.filter(el => Number(el.minPrice) > Number(filterData.minPrice))
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
				.map(({ id, minPrice }) => ({
					id,
					maxPrice: String(minPrice)
				}))
		);

	};

	const fetchTransmissions = useCallback(async () => {

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/transmissions`);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/transmissions`);

		if (!res.ok) throw new Error("Ошибка загрузки брендов fetchTransmissions");

		const data: ModalItem[] = await res.json();

		setTransmission(
			data
				.sort((a, b) => String(b).localeCompare(String(a)))
				.map((value, index) => ({ id: index + 1, transmission: String(translateTransmission(value)) }))
		);
	}, []);

	const fetchFuel = useCallback(async () => {

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/fuel`);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/fuel`);

		if (!res.ok) throw new Error("Ошибка загрузки брендов fetchFuel");

		const data: { id: number, fuel: string }[] = await res.json();

		setFuel(
			data
				.sort((a, b) => String(translateFuel(a.fuel)).localeCompare(translateFuel(b.fuel)))
				.map(({ id, fuel }) => ({ id, fuel: translateFuel(fuel) }))
		);
	}, []);

	const fetchColor = useCallback(async () => {

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/color`);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/color`);

		if (!res.ok) throw new Error("Ошибка загрузки брендов fetchColor");

		const data: { id: number, color: string }[] = await res.json();

		setColors(
			data
				.sort((a, b) => String(translateColor(a.color)).localeCompare(translateColor(b.color)))
				.map(({ id, color }) => ({ id, color: translateColor(color) }))
		);
	}, []);

	const fetchBody = useCallback(async () => {

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/body`);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/body`);

		if (!res.ok) throw new Error("Ошибка загрузки брендов fetchBody");

		const data: { id: number, body: string }[] = await res.json();

		setBodies(
			data
				.sort((a, b) => String(translateBody(a.body)).localeCompare(translateBody(b.body)))
				.map(({ id, body }) => ({ id, body: translateBody(body) }))
		);
	}, []);

	const fetchOption = useCallback(async () => {

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/option`);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/option`);

		if (!res.ok) throw new Error("Ошибка загрузки брендов fetchOption");

		const data: { id: number, option: string }[] = await res.json();

		setOptions(
			data
				.sort((a, b) => String(a.option).localeCompare(String(b.option)))
				.map(({ id, option }) => ({ id, option: String(option) }))
		);
	}, []);

	const countSelected = useCallback(async () => {


		const sendData = {
			minMileage: filterData.minMileage,
			maxMileage: filterData.maxMileage,
			minYear: filterData.minYear,
			maxYear: filterData.maxYear,
			minPrice: filterData.minPrice,
			maxPrice: filterData.maxPrice,
			brandIds: filterData.brandIds,
			modelIds: filterData.modelIds,
			editionIds: filterData.editionIds,
			fuelIds: filterData.fuelIds,
			colorIds: filterData.colorIds,
			minEngine: Number(filterData.minEngine) * 1000,
			maxEngine: Number(filterData.maxEngine) * 1000,
			bodyIds: filterData.bodyIds,
			transmissionIds: filterData.transmissionIds,
			optionIds: filterData.optionIds
		};

		// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/count`, {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/count`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(sendData)
		});

		if (!res.ok) throw new Error("Ошибка загрузки моделей fetchModels");

		const data: any = await res.json();

		setCount(data)
	}, [filterData])

	const getFilteredCars = async (filterData: FilterProps) => {
		console.log("Отправляем фильтр:", filterData);

		const res = await fetch(
			// `${process.env.NEXT_PUBLIC_API_URL}/cars/filter`,
			`${process.env.NEXT_PUBLIC_API_URL}/api/cars/filter`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(filterData),
				cache: "no-store",
			}
		);

		if (!res.ok) throw new Error("Ошибка загрузки getFilteredCars");

		const data: Car[] = await res.json();

		console.log(data);


		setCarsData(data)
	}

	useEffect(() => {
		if (pathname !== "/") return; // Добавляем фикс только на главной

		const handleScroll = () => {
			setIsFixed(window.scrollY > 930);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pathname]);

	useEffect(() => {

		setFilterData({
			brandIds: [],
			modelIds: [],
			editionIds: [],
			minYear: undefined,
			maxYear: undefined,
			minEngine: undefined,
			maxEngine: undefined,
			minMileage: undefined,
			maxMileage: undefined,
			minPrice: undefined,
			maxPrice: undefined,
			transmissionIds: [],
			fuelIds: [],
			bodyIds: [],
			colorIds: [],
			optionIds: []
		});

		fetchBrands();
		fetchMinYear();
		fetchMinEngine();
		fetchMinMileage()
		fetchMinPrice()
		fetchTransmissions()
		fetchFuel()
		fetchColor()
		fetchBody()
		fetchOption()

		setTimeout(() => {
			setLoading(false)
		}, 100);

	}, [fetchBrands, fetchMinYear, fetchMinEngine, fetchMinMileage, fetchMinPrice, fetchTransmissions, fetchFuel, fetchColor, fetchBody, fetchOption]);

	useEffect(() => {

		fetchMaxYear()

	}, [minYears, filterData.minYear]);

	useEffect(() => {

		fetchMaxEngine()

	}, [minEngines, filterData.minEngine]);

	useEffect(() => {

		fetchMaxMileage()

	}, [minMileages, filterData.minMileage]);

	useEffect(() => {

		fetchMaxPrice()

	}, [minPrice, filterData.minPrice]);

	useEffect(() => {
		setFilterData({
			modelIds: [],
			editionIds: [],
		});
		setModels([])
		setEditions([])
		if (filterData.brandIds?.length) {
			fetchModels(filterData.brandIds)
		}
	}, [filterData.brandIds])

	useEffect(() => {
		setFilterData({
			editionIds: [],
		});

		setEditions([])

		if (filterData.brandIds?.length && filterData.modelIds?.length) {
			fetchEditions(filterData.brandIds, filterData.modelIds)
		}
	}, [filterData.modelIds])

	useEffect(() => {
		countSelected()
	}, [countSelected])


	const handleShow = (list: ModalItem[], radio?: boolean) => {
		if (!list.length) return;

		setShow(true);
		setModalTitle('');
		setModalList([]);
		setModalListRadio([]);

		const keyValue = Object.keys(list[0]).find(key => typeof list[0][key] === 'string');
		if (!keyValue) return;

		setModalTitle(filterTitle(keyValue));

		const updatedList = list.map(item => {
			const key = Object.keys(item).find(k => typeof item[k] === 'string');
			if (!key) return { id: Number(item.id), [keyValue]: '', type: keyValue };

			const itemData: any = { id: Number(item.id), [keyValue]: item[key] as string, type: keyValue };

			return itemData;
		});

		if (radio) {
			setModalListRadio(updatedList);
		} else {
			setModalList(updatedList);
		}
	};

	const handleClose = () => {
		if (show) {
			setShow(false)
		}
	}

	const handleSubmit = async () => {
		setLoader(true);
		setCarsData([]);

		setBrands([])
		setModels([])
		setEditions([])
		setMinYears([])
		setMaxYears([])
		setMinEngines([])
		setMaxEngines([])
		setMinMileages([])
		setMaxMileages([])
		setMinPrice([])
		setMaxPrice([])
		setTransmission([])
		setFuel([])
		setBodies([])
		setBodies([])
		setColors([])
		setOptions([])


		if (isEmptyObject(filterData)) {
			alert(`Пожалуйста, выберите "Производителя"`);

			setTimeout(async () => {
				try {
					await Promise.all([
						fetchBrands(),
						fetchMinYear(),
						fetchMinEngine(),
						fetchMinMileage(),
						fetchMinPrice(),
						fetchTransmissions(),
						fetchFuel(),
						fetchColor(),
						fetchBody(),
						fetchOption(),
					]);
					console.log("Все данные загружены");
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}, 200);
			setLoader(false);
			return;
		}

		if (filterData.brandIds?.length === 0) {
			alert(`Пожалуйста, выберите "Производителя"`);

			setTimeout(async () => {
				try {
					await Promise.all([
						fetchBrands(),
						fetchMinYear(),
						fetchMinEngine(),
						fetchMinMileage(),
						fetchMinPrice(),
						fetchTransmissions(),
						fetchFuel(),
						fetchColor(),
						fetchBody(),
						fetchOption(),
					]);
					console.log("Все данные загружены");
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}, 200);
			setLoader(false);
			return;
		}

		if (count === 0) {
			alert(`Авто по вашим параметрам не найдены`);
			setLoader(false);
			return;
		}

		try {
			const sendData = {
				minMileage: filterData.minMileage,
				maxMileage: filterData.maxMileage,
				minYear: filterData.minYear,
				maxYear: filterData.maxYear,
				minPrice: filterData.minPrice,
				maxPrice: filterData.maxPrice,
				brandIds: filterData.brandIds,
				modelIds: filterData.modelIds,
				editionIds: filterData.editionIds,
				fuelIds: filterData.fuelIds,
				colorIds: filterData.colorIds,
				minEngine: filterData.minEngine ? Number(filterData.minEngine) * 1000 : undefined,
				maxEngine: filterData.maxEngine ? Number(filterData.maxEngine) * 1000 : undefined,
				bodyIds: filterData.bodyIds,
				transmissionIds: filterData.transmissionIds,
				optionIds: filterData.optionIds
			};

			console.log("Отправляем данные:", sendData);

			await getFilteredCars(sendData);

			setFilterData({
				minMileage: undefined,
				maxMileage: undefined,
				minYear: undefined,
				maxYear: undefined,
				minPrice: undefined,
				maxPrice: undefined,
				brandIds: [],
				modelIds: [],
				editionIds: [],
				fuelIds: [],
				colorIds: [],
				minEngine: undefined,
				maxEngine: undefined,
				bodyIds: [],
				transmissionIds: [],
				optionIds: []
			});

			setLoader(false);

			setTimeout(() => {
				searchRef.current?.scrollIntoView({ behavior: "smooth" });
			}, 100);

			setTimeout(async () => {
				try {
					await Promise.all([
						fetchBrands(),
						fetchMinYear(),
						fetchMinEngine(),
						fetchMinMileage(),
						fetchMinPrice(),
						fetchTransmissions(),
						fetchFuel(),
						fetchColor(),
						fetchBody(),
						fetchOption(),
					]);
					console.log("Все данные загружены");
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}, 200);


		} catch (error) {
			console.error("Ошибка при фильтрации:", error);
			setLoader(false);
		}
	};


	if (loading) {
		return (
			<Loading />
		)
	}

	return (
		<>
			<HeaderInner />
			<section className={`filter ${isFixed ? "fix" : "mb-3"}`} id='filter'>
				<div className=" container">
					<div className="row row-gap-3">
						<div className=" col-12">
							<hr className='m-0' />
						</div>
						<div className="col-12 d-flex align-items-center gap-3 justify-content-center mb-0">
							<Image
								src='/search.svg'
								alt={`${seoAltImage} | search`}
								width={20}
								height={20}
								priority
							/>
							<span style={{ fontSize: 18 }}>Поиск по фильтру</span>
						</div>
						{filterOptions.map(({ key, name, radio }) =>
							<FilterInput
								key={name}
								filterData={filterData}
								filters={key}
								onClick={() => handleShow(key, !!radio)}
								name={name}
								radio={radio}
							/>
						)}
					</div>
				</div>
			</section>
			<div className={`btn_filter margin_bottom ${isFixed ? "fix" : ""}`}>
				<div className=" container mb-4">
					<div className=" row">
						<div className="col-12 col-md-4 mx-auto">
							<Btn
								onClick={handleSubmit}
								clazz='filter_submit_btn'
								icon='look'
								type='submit'
								disabled={loader}
							>
								{loader ?
									'Загружаю...' : filterData.brandIds?.length ?
										`Показать (${count})`
										: 'Подбор по фильтру'
								}
							</Btn>
						</div>
					</div>
				</div>
			</div>
			<CarListFiltered ref={searchRef} />
			<FilterModal
				show={show}
				title={modalTitle}
				list={modalList}
				listRadio={modalListRadio}
				handleClose={handleClose}
			/>
		</>
	);
}

export default FilterProd;
