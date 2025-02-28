"use client";

import { useEffect, useState } from "react";
import Btn from "./Btn";
import { useFavoriteStore } from "@/store/useFavoriteStore";

interface FavoriteButtonProps {
	carId: string;
}

// export default function FavoriteButton({ carId }: FavoriteButtonProps) {
// 	const { favoriteIds, setFavoriteIds } = useFavoriteStore();
// 	const [isFavorite, setIsFavorite] = useState(false);

// 	// Загружаем избранное из localStorage только при первом рендере
// 	useEffect(() => {
// 		const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
// 		setFavoriteIds(savedFavorites); // Устанавливаем в Zustand
// 	}, []);

// 	// Обновляем isFavorite при изменении избранного
// 	useEffect(() => {
// 		setIsFavorite(favoriteIds.includes(carId));

// 		// ✅ Теперь сохраняем даже пустой массив, чтобы localStorage очищался
// 		localStorage.setItem("favorites", JSON.stringify(favoriteIds));
// 	}, [favoriteIds, carId]);

// 	const toggleFavorite = () => {
// 		let updatedFavorites;

// 		if (isFavorite) {
// 			updatedFavorites = favoriteIds.filter((id) => id !== carId);
// 		} else {
// 			updatedFavorites = [...favoriteIds, carId];
// 		}

// 		setFavoriteIds(updatedFavorites); // Обновляем Zustand
// 	};

// 	return (
// 		<Btn
// 			onClick={toggleFavorite}
// 			clazz={`w-100 car_btn_wish ${isFavorite ? "added" : ""}`}
// 			icon={isFavorite ? "added-wishlist" : "add-wishlist"}
// 		>
// 			<span className={`${isFavorite ? " text-accent" : ""}`}>
// 				{isFavorite ? "Убрать" : "В избранное"}
// 			</span>
// 		</Btn>
// 	);
// }

export default function FavoriteButton({ carId }: FavoriteButtonProps) {
	const { favoriteIds, toggleFavorite } = useFavoriteStore();
	const isFavorite = favoriteIds.includes(carId);

	return (
		<Btn
			onClick={() => toggleFavorite(carId)}
			clazz={`w-100 car_btn_wish ${isFavorite ? "added" : ""}`}
			icon={isFavorite ? "added-wishlist" : "add-wishlist"}
		>
			<span className={`${isFavorite ? "text-accent" : ""}`}>
				{isFavorite ? "Убрать" : "В избранное"}
			</span>
		</Btn>
	);
}