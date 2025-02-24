/** @format */

import { FilterProps } from "@/components/Filter";
import { create } from "zustand";

interface FilterDataStore {
    filterData: FilterProps;
    setFilterData: (filterProps: Partial<FilterProps>) => void;
}

export const useFilterDataStore = create<FilterDataStore>((set) => ({
    filterData: {},
    setFilterData: (filterProps: Partial<FilterProps>) => {
        set((state) => ({
            filterData: {
                ...state.filterData,
                ...filterProps,
            },
        }));
    },
}));
