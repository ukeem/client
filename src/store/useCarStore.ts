/** @format */

import { Car } from "@/types/Car";
import { create } from "zustand";

interface CarStore {
    cars: Car[];
    setCars: (cars: Car[]) => void;
}

export const useCarStore = create<CarStore>((set) => ({
    cars: [],
    setCars: (cars) => set({ cars }),
}));
