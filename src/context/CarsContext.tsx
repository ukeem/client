"use client";

import { Car } from '@/types/Car';
import { createContext, ReactNode, useContext, useState } from "react";

interface CarsContextType {
	cars: Car[];
	setCars: (cars: Car[]) => void;
}

const CarsContext = createContext<CarsContextType>({
	cars: [],
	setCars: () => { },
});

interface CarsProviderProps {
	children: ReactNode;
	initialCars?: Car[];
}

export function CarsProvider({ children, initialCars = [] }: CarsProviderProps) {
	const [cars, setCars] = useState(initialCars);

	return (
		<CarsContext.Provider value={{ cars, setCars }}>
			{children}
		</CarsContext.Provider>
	);
}

export function useCars() {
	return useContext(CarsContext);
}
