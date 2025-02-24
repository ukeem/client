/** @format */

import { create } from "zustand";

interface FavoriteStore {
    favoriteIds: string[];
    setFavoriteIds: (ids: string[]) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favoriteIds: [],
    setFavoriteIds: (ids) => set({ favoriteIds: [...ids] }), // Новый массив!
}));
