'use client'
import { FC } from 'react';
import { filterTitle, isNumberArray } from '@/lib/fn';
import Image from 'next/image';
import { FilterProps, ModalItem } from './Filter';
import { seoAltImage } from '@/lib/constants';

interface FilterInputProps {
	filterData: FilterProps
	filters: ModalItem[]
	onClick?: () => void
	name?: string
	radio?: boolean
}

const FilterInput: FC<FilterInputProps> = ({ filterData, filters, onClick, name, radio }) => {

	return (
		<div className={radio ? 'col-6 col-md-2' : 'col-12 col-md-4'}>
			<div
				className={`filter_field d-flex justify-content-between align-items-center p-2 p-md-3 ${filters.length > 0 ? '' : 'disabled'} `}
				onClick={onClick}
			>
				{
					radio ?
						(
							<span>
								{
									(() => {
										if (!filters[0]) return name;

										const type = Object.keys(filters[0]).find(key => typeof filters[0][key] === "string");
										if (!type) return name;

										const filterProp = filterData[type as keyof FilterProps];


										const filteredResult = filters.some((item) => Number(item[type]) === Number(filterProp));

										if (filteredResult) {
											return filterProp
										} else {
											return filterTitle(type);
										}
									})()
								}
							</span>
						) : (
							<span>
								{
									(() => {
										if (!filters[0]) return name;

										const type = Object.keys(filters[0]).find(key => typeof filters[0][key] === "string");
										if (!type) return name;

										const key = `${type}Ids`;

										const filterProp = filterData[key as keyof FilterProps];

										const filteredResult = Array.isArray(filterProp)
											? filters
												.filter((item: any) => filterProp.includes(item.id))
												.map((i: any) => i[type])
												.join(', ')
											: '';

										if (Array.isArray(filterProp) && isNumberArray(filterProp)) {
											return filteredResult ? filteredResult : filterTitle(type);
										} else {
											return name;
										}
									})()
								}
							</span>
						)
				}
				<Image
					src={`/arrow.svg`}
					alt={`${seoAltImage} | arrow`}
					width={16}
					height={10}
					priority
				/>
			</div>
		</div >
	);
}

export default FilterInput;
