'use client'
import Image from 'next/image';
import { useEffect, useState, type FC } from 'react';
import FilterModal from './FilterModal';
import { useFilterDataStore } from '@/store/useFilterDataStore';
import { Car } from '@/types/Car';
import FilterInput from './FilterInput';
import { filterTitle, isEmptyObject, searchFilterCar, translateBody, translateColor, translateFuel, translateTransmission } from '@/lib/fn';
import Btn from './Btn';
import { usePathname, useRouter, } from 'next/navigation';
import { seoAltImage } from '@/lib/constants';
import { useCarsDataStore } from '@/store/useCarsDataStore';
import HeaderInner from './HeaderInner';
import CarListFiltered from './CarListFiltered';
import { useCarStore } from '@/store/useCarStore';

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

interface Filter {
	allCars: Car[]
}


export interface ModalItem {
	id: number;
	[key: string]: string | number;
}


const Filter: FC<Filter> = ({ allCars }) => {

	// const { cars, setCars } = useCarStore();
	const [cars, setCars] = useState<Car[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loader, setLoader] = useState<boolean>(false);

	const { filterData, setFilterData } = useFilterDataStore();
	const { setCarsData } = useCarsDataStore();

	const [show, setShow] = useState(false);

	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalList, setModalList] = useState<ModalItem[]>([]);
	const [modalListRadio, setModalListRadio] = useState<ModalItem[]>([]);

	const [brands, setBrands] = useState<ModalItem[]>([]);
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

	const [isFixed, setIsFixed] = useState(false);

	const pathname = usePathname();


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

	const filteredCars = cars.filter(({ brand, model, edition, year, engine, mileage, price, transmission, fuel, body, color }) => {
		const brandFilter = filterData.brandIds?.length! > 0 ? filterData.brandIds?.includes(brand.id) : true;
		const modelFilter = filterData.modelIds?.length! > 0 ? filterData.modelIds?.includes(model.id) : true;
		const editionFilter = filterData.editionIds?.length! > 0 ? filterData.editionIds?.includes(edition.id) : true;
		const minYearFilter = filterData.minYear ? year >= filterData.minYear : true;
		const maxYearFilter = filterData.maxYear ? year <= filterData.maxYear : true;
		const minEngineFilter = filterData.minEngine ? engine.engine >= filterData.minEngine : true;
		const maxEngineFilter = filterData.maxEngine ? engine.engine <= filterData.maxEngine : true;
		const minMileageFilter = filterData.minMileage ? mileage >= filterData.minMileage : true;
		const maxMileageFilter = filterData.maxMileage ? mileage <= filterData.maxMileage : true;
		const minPriceFilter = filterData.minPrice ? (Math.round(price / 100000) * 100000) >= Math.round(filterData.minPrice / 100000) * 100000 : true;
		const maxPriceFilter = filterData.maxPrice ? (Math.round(price / 100000) * 100000) <= Math.round(filterData.maxPrice / 100000) * 100000 : true;
		const transmissionFilter = filterData.transmissionIds?.length! > 0 ? filterData.transmissionIds?.includes(transmission.id) : true;
		const fuelFilter = filterData.fuelIds?.length! > 0 ? filterData.fuelIds?.includes(fuel.id) : true;
		const bodyFilter = filterData.bodyIds?.length! > 0 ? filterData.bodyIds?.includes(body.id) : true;
		const colorFilter = filterData.colorIds?.length! > 0 ? filterData.colorIds?.includes(color.id) : true;

		const optionFilter = filterData.optionIds?.length! > 0
			? options.some(option => filterData.optionIds?.includes(option.id))
			: true;

		return brandFilter
			&& modelFilter
			&& editionFilter
			&& minYearFilter
			&& maxYearFilter
			&& minEngineFilter
			&& maxEngineFilter
			&& minMileageFilter
			&& maxMileageFilter
			&& minPriceFilter
			&& maxPriceFilter
			&& transmissionFilter
			&& fuelFilter
			&& bodyFilter
			&& colorFilter
			&& optionFilter;
	})

	useEffect(() => {
		if (pathname !== "/") return; // Добавляем фикс только на главной

		const handleScroll = () => {
			setIsFixed(window.scrollY > 930);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pathname]);

	useEffect(() => {

		setCarsData([]);
		if (allCars.length) {
			setCars(allCars);
		}

	}, [allCars]);

	useEffect(() => {

		setLoading(true);

		if (cars.length > 0) {

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

			const brandCounts = cars.reduce((acc, { brand }) => {
				acc[brand.brand] = (acc[brand.brand] || 0) + 1;
				return acc;
			}, {} as Record<string, number>);

			const brand = cars
				.map(({ brand }) => ({
					id: brand.id,
					brand: `${brand.brand} (${brandCounts[brand.brand]})`
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.brand === value.brand)
				)
				.sort((a, b) => a.brand.localeCompare(b.brand));

			setBrands(brand);


			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	}, [cars]);

	// useEffect(() => {
	// 	if (cars && cars.length) {
	// 		setFilterData({
	// 			minMileage: undefined,
	// 			maxMileage: undefined,
	// 			minYear: undefined,
	// 			maxYear: undefined,
	// 			minPrice: undefined,
	// 			maxPrice: undefined,
	// 			brandIds: [],
	// 			modelIds: [],
	// 			editionIds: [],
	// 			fuelIds: [],
	// 			colorIds: [],
	// 			minEngine: undefined,
	// 			maxEngine: undefined,
	// 			bodyIds: [],
	// 			transmissionIds: []
	// 		});

	// 		const brand = cars
	// 			.map(({ brand }) => ({
	// 				id: brand.id,
	// 				brand: `${brand.brand} (${brandCounts[brand.brand]})`
	// 			}))
	// 			.filter((value, index, self) =>
	// 				index === self.findIndex((v) => v.brand === value.brand)
	// 			)
	// 			.sort((a, b) => a.brand.localeCompare(b.brand))
	// 		setBrands(brand);

	// 	}
	// }, [cars]);

	useEffect(() => {
		if (filterData.brandIds) {

			setFilterData({
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
			setColors([])
			setOptions([])


			//model
			const model = filteredCars
				.map(({ model, brand }) => ({
					id: model.id,
					model: `(${brand.brand}) ${model.model}`
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.model === value.model)
				)
				.sort((a, b) => a.model.localeCompare(b.model))
			setModels(model);


			//edition
			const edition = filteredCars
				.map(({ edition }) => ({
					id: edition.id,
					edition: edition.edition
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.edition === value.edition)
				)
				.sort((a, b) => a.edition.localeCompare(b.edition))
			setEditions(edition);


			//minYearsData
			const minYearsData = filteredCars
				.map(({ year }, index) => ({
					id: index,
					minYear: String(year)
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minYear === value.minYear)
				)
				.sort((a, b) => a.minYear.localeCompare(b.minYear))
			setMinYears(minYearsData);



			//maxYearsData
			const maxYearsData = filteredCars
				.map(({ year }, index) => ({
					id: index,
					maxYear: String(year)
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxYear === value.maxYear)
				)
				.sort((a, b) => a.maxYear.localeCompare(b.maxYear))
			setMaxYears(maxYearsData);


			//minEnginesData
			const minEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						minEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minEngine === value.minEngine)
				)
				.sort((a, b) => a.minEngine.localeCompare(b.minEngine))
			setMinEngines(minEnginesData);


			//maxEnginesData
			const maxEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						maxEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxEngine === value.maxEngine)
				)
				.sort((a, b) => a.maxEngine.localeCompare(b.maxEngine))
			setMaxEngines(maxEnginesData);



			//minMileagesData
			const minMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						minMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minMileage === value.minMileage)
				)
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
			setMinMileages(minMileagesData);


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.brandIds])

	useEffect(() => {
		if (filterData.modelIds) {

			setFilterData({
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
			setColors([])
			setOptions([])

			//edition
			const edition = filteredCars
				.map(({ edition, brand }) => ({
					id: edition.id,
					edition: `(${brand.brand}) ${edition.edition}`
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.edition === value.edition)
				)
				.sort((a, b) => a.edition.localeCompare(b.edition))
			setEditions(edition);


			//minYearsData
			const minYearsData = filteredCars
				.map(({ year }, index) => ({
					id: index,
					minYear: String(year)
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minYear === value.minYear)
				)
				.sort((a, b) => a.minYear.localeCompare(b.minYear))
			setMinYears(minYearsData);



			//maxYearsData
			const maxYearsData = filteredCars
				.map(({ year }, index) => ({
					id: index,
					maxYear: String(year)
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxYear === value.maxYear)
				)
				.sort((a, b) => a.maxYear.localeCompare(b.maxYear))
			setMaxYears(maxYearsData);


			//minEnginesData
			const minEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						minEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minEngine === value.minEngine)
				)
				.sort((a, b) => a.minEngine.localeCompare(b.minEngine))
			setMinEngines(minEnginesData);


			//maxEnginesData
			const maxEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						maxEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxEngine === value.maxEngine)
				)
				.sort((a, b) => a.maxEngine.localeCompare(b.maxEngine))
			setMaxEngines(maxEnginesData);



			//minMileagesData
			const minMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						minMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minMileage === value.minMileage)
				)
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
			setMinMileages(minMileagesData);


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.modelIds])

	useEffect(() => {
		if (filterData.editionIds) {

			setFilterData({
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
			setColors([])
			setOptions([])


			//minYearsData
			const minYearsData = filteredCars
				.map(({ year }, index) => ({
					id: index,
					minYear: String(year)
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minYear === value.minYear)
				)
				.sort((a, b) => a.minYear.localeCompare(b.minYear))
			setMinYears(minYearsData);



			//maxYearsData
			const maxYearsData = filteredCars
				.map(({ year }, index) => ({
					id: index,
					maxYear: String(year)
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxYear === value.maxYear)
				)
				.sort((a, b) => a.maxYear.localeCompare(b.maxYear))
			setMaxYears(maxYearsData);


			//minEnginesData
			const minEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						minEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minEngine === value.minEngine)
				)
				.sort((a, b) => a.minEngine.localeCompare(b.minEngine))
			setMinEngines(minEnginesData);


			//maxEnginesData
			const maxEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						maxEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxEngine === value.maxEngine)
				)
				.sort((a, b) => a.maxEngine.localeCompare(b.maxEngine))
			setMaxEngines(maxEnginesData);



			//minMileagesData
			const minMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						minMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minMileage === value.minMileage)
				)
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
			setMinMileages(minMileagesData);


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.editionIds])

	useEffect(() => {
		if (filterData.minYear) {

			setFilterData({
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
			setColors([])
			setOptions([])



			//maxYearsData
			const maxYearsData = filteredCars
				.map(({ year }, index) => ({
					id: index,
					maxYear: String(year)
				}))
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxYear === value.maxYear)
				)
				.sort((a, b) => a.maxYear.localeCompare(b.maxYear))
			setMaxYears(maxYearsData);


			//minEnginesData
			const minEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						minEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minEngine === value.minEngine)
				)
				.sort((a, b) => a.minEngine.localeCompare(b.minEngine))
			setMinEngines(minEnginesData);


			//maxEnginesData
			const maxEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						maxEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxEngine === value.maxEngine)
				)
				.sort((a, b) => a.maxEngine.localeCompare(b.maxEngine))
			setMaxEngines(maxEnginesData);



			//minMileagesData
			const minMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						minMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minMileage === value.minMileage)
				)
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
			setMinMileages(minMileagesData);


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.minYear])

	useEffect(() => {
		if (filterData.maxYear) {

			setFilterData({
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
			setMinEngines([])
			setMaxEngines([])
			setMinMileages([])
			setMaxMileages([])
			setMinPrice([])
			setMaxPrice([])
			setTransmission([])
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])



			//minEnginesData
			const minEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						minEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minEngine === value.minEngine)
				)
				.sort((a, b) => a.minEngine.localeCompare(b.minEngine))
			setMinEngines(minEnginesData);


			//maxEnginesData
			const maxEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						maxEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxEngine === value.maxEngine)
				)
				.sort((a, b) => a.maxEngine.localeCompare(b.maxEngine))
			setMaxEngines(maxEnginesData);



			//minMileagesData
			const minMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						minMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minMileage === value.minMileage)
				)
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
			setMinMileages(minMileagesData);


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.maxYear])

	useEffect(() => {
		if (filterData.minEngine) {

			setFilterData({
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
			setMaxEngines([])
			setMinMileages([])
			setMaxMileages([])
			setMinPrice([])
			setMaxPrice([])
			setTransmission([])
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])


			//maxEnginesData
			const maxEnginesData = filteredCars
				.map(({ engine }) => {
					return {
						id: engine.id,
						maxEngine: String(engine.engine)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxEngine === value.maxEngine)
				)
				.sort((a, b) => a.maxEngine.localeCompare(b.maxEngine))
			setMaxEngines(maxEnginesData);



			//minMileagesData
			const minMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						minMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minMileage === value.minMileage)
				)
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
			setMinMileages(minMileagesData);


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.minEngine])

	useEffect(() => {
		if (filterData.maxEngine) {

			setFilterData({
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
			setMinMileages([])
			setMaxMileages([])
			setMinPrice([])
			setMaxPrice([])
			setTransmission([])
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])



			//minMileagesData
			const minMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						minMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minMileage === value.minMileage)
				)
				.sort((a, b) => Number(a.minMileage) - Number(b.minMileage))
			setMinMileages(minMileagesData);


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.maxEngine])

	useEffect(() => {
		if (filterData.minMileage) {

			setFilterData({
				maxMileage: undefined,
				minPrice: undefined,
				maxPrice: undefined,
				transmissionIds: [],
				fuelIds: [],
				bodyIds: [],
				colorIds: [],
				optionIds: []
			});
			setMaxMileages([])
			setMinPrice([])
			setMaxPrice([])
			setTransmission([])
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])


			const maxMileagesData = filteredCars
				.map(({ mileage }, index) => {
					return {
						id: index,
						maxMileage: String(mileage)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxMileage === value.maxMileage)
				)
				.sort((a, b) => Number(a.maxMileage) - Number(b.maxMileage))
			setMaxMileages(maxMileagesData);


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.minMileage])

	useEffect(() => {
		if (filterData.maxMileage) {

			setFilterData({
				minPrice: undefined,
				maxPrice: undefined,
				transmissionIds: [],
				fuelIds: [],
				bodyIds: [],
				colorIds: [],
				optionIds: []
			});
			setMinPrice([])
			setMaxPrice([])
			setTransmission([])
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])


			const minPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						minPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.minPrice === value.minPrice)
				)
				.sort((a, b) => Number(a.minPrice) - Number(b.minPrice))
			setMinPrice(minPricesData);


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.maxMileage])

	useEffect(() => {
		if (filterData.minPrice) {

			setFilterData({
				maxPrice: undefined,
				transmissionIds: [],
				fuelIds: [],
				bodyIds: [],
				colorIds: [],
				optionIds: []
			});
			setMaxPrice([])
			setTransmission([])
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])


			const maxPricesData = filteredCars
				.map(({ price }, index) => {
					return {
						id: index,
						maxPrice: String(Math.round(price / 100000) * 100000)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.maxPrice === value.maxPrice)
				)
				.sort((a, b) => Number(a.maxPrice) - Number(b.maxPrice))
			setMaxPrice(maxPricesData);


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.minPrice])

	useEffect(() => {
		if (filterData.maxPrice) {

			setFilterData({
				transmissionIds: [],
				fuelIds: [],
				bodyIds: [],
				colorIds: [],
				optionIds: []
			});
			setTransmission([])
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])


			const transmissionsData = filteredCars
				.map(({ transmission }) => {
					return {
						id: transmission.id,
						transmission: translateTransmission(transmission.transmission)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.transmission === value.transmission)
				)
				.sort((a, b) => Number(a.transmission) - Number(b.transmission))
			setTransmission(transmissionsData);


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.maxPrice])

	useEffect(() => {
		if (filterData.transmissionIds) {

			setFilterData({
				fuelIds: [],
				bodyIds: [],
				colorIds: [],
				optionIds: []
			});
			setFuel([])
			setBodies([])
			setColors([])
			setOptions([])


			const fuelsData = filteredCars
				.map(({ fuel }) => {
					return {
						id: fuel.id,
						fuel: translateFuel(fuel.fuel)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.fuel === value.fuel)
				)
				.sort((a, b) => a.fuel.localeCompare(b.fuel))
			setFuel(fuelsData);



			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.transmissionIds])

	useEffect(() => {
		if (filterData.fuelIds) {

			setFilterData({
				bodyIds: [],
				colorIds: [],
				optionIds: []
			});
			setBodies([])
			setColors([])
			setOptions([])

			const bodiesData = filteredCars
				.map(({ body }) => {
					return {
						id: body.id,
						body: translateBody(body.body)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.body === value.body)
				)
				.sort((a, b) => a.body.localeCompare(b.body))
			setBodies(bodiesData);



			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.fuelIds])

	useEffect(() => {
		if (filterData.bodyIds) {

			setFilterData({
				colorIds: [],
				optionIds: []
			});
			setColors([])
			setOptions([])

			const colorsData = filteredCars
				.map(({ color }) => {
					return {
						id: color.id,
						color: translateColor(color.color)
					}
				})
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.color === value.color)
				)
				.sort((a, b) => a.color.localeCompare(b.color))
			setColors(colorsData);



			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.bodyIds])

	useEffect(() => {
		if (filterData.colorIds) {

			setFilterData({
				optionIds: []
			});
			setOptions([])

			const optionsData = filteredCars
				.flatMap(({ options }) =>
					options.map(el => ({
						id: el.id,
						option: el.option
					}))
				)
				.filter((value, index, self) =>
					index === self.findIndex((v) => v.option === value.option)
				)
				.sort((a, b) => a.option.localeCompare(b.option))
			setOptions(optionsData);
		}

	}, [filterData.colorIds])

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

	const handleSubmit = () => {
		setLoader(true);
		setCarsData([]);

		if (isEmptyObject(filterData)) {
			alert(`Пожалуйста, выберите "Производителя"`);
			setLoading(false);
			return;
		}

		if (filterData.brandIds?.length === 0) {
			alert(`Пожалуйста, выберите "Производителя"`);
			setLoading(false);
			return;
		}

		// Даем React обновить loading перед выполнением фильтрации
		setTimeout(() => {
			const filteredData = searchFilterCar(filterData, cars);
			filteredData.sort((a, b) => a.price - b.price);
			setCarsData(filteredData);

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
			document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });

			setLoader(false);
		}, 1000);
	};


	if (brands.length === 0 || loading) {
		return (
			<div className="loading">
				<div className=" d-flex flex-column justify-content-center align-items-center">
					<svg className="car mb-4" width="102" height="40" xmlns="http://www.w3.org/2000/svg">
						<g transform="translate(2 1)" stroke="#F44336" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
							<path className="car__body" d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01" strokeWidth="3" />
							<ellipse className="car__wheel--left" strokeWidth="3.2" fill="#fff" cx="83.493" cy="30.25" rx="6.922" ry="6.808" />
							<ellipse className="car__wheel--right" strokeWidth="3.2" fill="#fff" cx="46.511" cy="30.25" rx="6.922" ry="6.808" />
							<path className="car__line car__line--top" d="M22.5 16.5H2.475" strokeWidth="3" />
							<path className="car__line car__line--middle" d="M20.5 23.5H.4755" strokeWidth="3" />
							<path className="car__line car__line--bottom" d="M25.5 9.5h-19" strokeWidth="3" />
						</g>
					</svg>
					<p className=' text-center '>
						Пожалуйста, подождите немного
						<br />
						Идет загрузка всех авто...
						<br />
						<span className=' text-accent'>Среднее время ожидания 15-20 секунд</span>
					</p>
				</div>
			</div>
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
			<div className={`btn_filter ${isFixed ? "fix" : ""}`}>
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
									'Идет поиск ...' : filterData.brandIds?.length ?
										`Найдено (${searchFilterCar(filterData, cars).length})`
										: 'Найти'
								}
							</Btn>
						</div>
					</div>
				</div>
			</div>
			<CarListFiltered />
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

export default Filter;
