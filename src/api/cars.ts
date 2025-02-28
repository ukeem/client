/** @format */

"use server";

import { Car } from "@/types/Car";

export async function getCars(
    limit = 9,
    offset = 0,
    orderKey?: string,
    orderValue?: string
): Promise<Car[]> {
    const body: Record<string, any> = { limit, offset };

    // Добавляем orderKey и orderValue только если они заданы
    if (orderKey) body.orderKey = orderKey;
    if (orderValue) body.orderValue = orderValue;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cars/filter`,
        // `${process.env.NEXT_PUBLIC_API_URL}/api/cars/filter`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            cache: "no-store",
        }
    );

    if (!res.ok) throw new Error("Ошибка загрузки данных");

    return res.json();
}

export async function getAllCars(
    orderKey?: string,
    orderValue?: string
): Promise<Car[]> {
    const params = new URLSearchParams();

    if (orderKey) params.append("orderKey", orderKey);
    if (orderValue) params.append("orderValue", orderValue);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/cars?${params.toString()}`;

    // const url = `${
    //     process.env.NEXT_PUBLIC_API_URL
    // }/api/cars?${params.toString()}`;

    const res = await fetch(url, {
        method: "GET",
        cache: "force-cache",
    });

    if (!res.ok) {
        throw new Error(
            `Ошибка загрузки данных: ${res.status} ${res.statusText}`
        );
    }

    return await res.json();
}

export async function getCarById(id: string): Promise<Car> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
        // `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`,
        {
            method: "GET",
            cache: "force-cache",
        }
    );

    if (!res.ok) throw new Error("Ошибка загрузки данных автомобиля");

    return res.json();
}

export async function saveAllCars(
    data: string[],
    token: string
): Promise<Car[]> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/save`, {
    console.log("Saving cars:", JSON.stringify(data));
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/save`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ carIds: data }),
            cache: "no-store",
        }
    );

    if (!res.ok) throw new Error("Ошибка сохранения данных");

    return res.json();
}

export async function deleteCar(id: string, token: string): Promise<void> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (!res.ok) throw new Error("Ошибка удаления автомобиля");

    return res.json();
}

export async function findCars(token: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/find`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) throw new Error("Ошибка при поиске новых автомобилей");

    return res.json();
}
