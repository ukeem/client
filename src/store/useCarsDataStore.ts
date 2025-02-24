/** @format */

import { Car } from "@/types/Car";
import { create } from "zustand";

interface CarsStore {
    carsData: Car[];
    setCarsData: (carsProps: Car[]) => void;
}

export const useCarsDataStore = create<CarsStore>((set) => ({
    carsData: [],
    setCarsData: (carsProps: Car[]) => set({ carsData: carsProps }),
}));
