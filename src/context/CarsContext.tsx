"use client";

import { Car } from '@/types/Car';
import { createContext, ReactNode, useContext, useState } from "react";

interface CarsContextType {
	cars: Car[];
}

const CarsContext = createContext<CarsContextType>({ cars: [] });

interface CarsProviderProps {
	children: ReactNode
	initialCars: Car[]
}

export function CarsProvider({ children, initialCars = [] }: CarsProviderProps) {
	const [cars, setCars] = useState(initialCars);

	return (
		<CarsContext.Provider value={{ cars }}>
			{children}
		</CarsContext.Provider>
	);
}

export function useCars() {
	return useContext(CarsContext);
}
