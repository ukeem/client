import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { FilterProps, ModalItem } from './Filter';
import { useFilterDataStore } from '@/store/useFilterDataStore';
import Btn from './Btn';

interface FilterModalProps {
	show: boolean
	title: string
	list: ModalItem[]
	listRadio: ModalItem[]
	handleClose: () => void
}

const FilterModal: FC<FilterModalProps> = ({
	show,
	title,
	list,
	listRadio,
	handleClose
}) => {

	const { filterData, setFilterData } = useFilterDataStore();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
		name: string,
		radio?: boolean
	) => {
		if (radio) {
			const { value } = e.target;
			const updatedKey = name;

			setFilterData({
				// ...filterData,  // Распространяем предыдущее состояние
				[updatedKey]: Number(value),
			});


		} else {
			const { checked } = e.target;
			const updatedKey = `${name}Ids`;

			const currentArray = Array.isArray(filterData[updatedKey as keyof FilterProps]) ? filterData[updatedKey as keyof FilterProps] as number[] : [];

			const updatedArray = checked
				? [...currentArray, id]
				: currentArray.filter(item => item !== id);

			setFilterData({
				[updatedKey]: updatedArray,
			});


		}
	};

	return (
		<Modal
			show={show}
			fullscreen={'md-down'}
			onHide={handleClose}
			centered
			backdrop="static"
			scrollable={true}
		>
			<Modal.Header>
				<Modal.Title className='modal_title mx-auto'>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className=' overflow-y-auto'>
				{list.length > 0 ? (
					<div className=" d-flex flex-column">
						{list.map(item => (
							<label
								key={`${item.id}`}
								htmlFor={`${item.id}`}
								className='modal_checkbox d-flex align-items-center gap-2 py-3'
							>
								<input
									type='checkbox'
									id={`${item.id}`}
									name={Object.keys(item).find(k => typeof item[k] === "string")}
									checked={
										Array.isArray(filterData?.[`${Object.keys(item).find(k => typeof item[k] === "string")}Ids` as keyof FilterProps])
											? (filterData[`${Object.keys(item).find(k => typeof item[k] === "string")}Ids` as keyof FilterProps] as number[]).includes(item.id)
											: false
									}
									onChange={(e) => handleChange(e, item.id, `${item.type}`)}
								/>

								<span>
									{`${Object.values(item).find(value => typeof value === 'string')}`}
								</span>
							</label>
						))}
					</div>
				) : null}
				{listRadio.length > 0 ? (
					<div className="d-flex flex-column">
						{listRadio.map(item => {
							const itemType = item.type;
							const itemValue = filterData[item.type as keyof FilterProps];
							// console.log(String(item[itemType]));
							// console.log(String(itemValue));

							return (
								<label
									key={`${item.id}`}
									htmlFor={`${item.id}`}
									className='modal_checkbox d-flex align-items-center gap-2 py-3'
								>
									<input
										type='radio'
										id={`${item.id}`}
										name={`${itemType}`}
										value={`${item[itemType]}`}
										onChange={(e) => handleChange(e, item.id, `${itemType}`, true)}
										checked={String(item[itemType]) === String(itemValue)}
									/>

									<span>
										{itemType === "maxEngine" || itemType === "minEngine" ? (
											Number(item[itemType]) < 500 ? (
												'Электро'
											) : (
												<>
													{item[itemType]} см<sup>3</sup>
												</>
											)
										) : itemType === 'minPrice' || itemType === "maxPrice" ? (
											<>
												{(Math.round(Number(item[itemType]) / 100000) * 100000).toLocaleString('ru-RU')} ₽
											</>
										) : itemType === 'minMileage' || itemType === "maxMileage" ? (
											<>
												{Number(item[itemType]).toLocaleString('ru-RU')} км
											</>
										) : item[itemType]}
									</span>


								</label>
							);
						})}
					</div>
				) : null}
			</Modal.Body>
			<Modal.Footer>
				<Btn
					onClick={handleClose}
					clazz='modal_submit_btn mx-auto'
				>
					Выбрать
				</Btn>
			</Modal.Footer>
		</Modal>
	);
}

export default FilterModal;
