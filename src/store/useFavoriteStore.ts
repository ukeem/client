/** @format */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
    favoriteIds: string[];
    setFavoriteIds: (ids: string[]) => void;
    toggleFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set) => ({
            favoriteIds: [],
            setFavoriteIds: (ids) => set({ favoriteIds: ids }),
            toggleFavorite: (id) =>
                set((state) => {
                    const updatedFavorites = state.favoriteIds.includes(id)
                        ? state.favoriteIds.filter((favId) => favId !== id)
                        : [...state.favoriteIds, id];

                    return { favoriteIds: updatedFavorites };
                }),
        }),
        {
            name: "favorites", // 🔥 Zustand сам сохранит данные в localStorage под этим ключом
        }
    )
);
