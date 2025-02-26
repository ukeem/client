/** @format */

"use server";

import { Car } from "@/types/Car";

export async function getCars(
    limit = 9,
    offset = 0,
    orderKey?: string,
    orderValue?: string
): Promise<Car[]> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/filter`, {
    const body: Record<string, any> = { limit, offset };

    // Добавляем orderKey и orderValue только если они заданы
    if (orderKey) body.orderKey = orderKey;
    if (orderValue) body.orderValue = orderValue;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/filter`,
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
    try {
        const params = new URLSearchParams();

        if (orderKey) params.append("orderKey", orderKey);
        if (orderValue) params.append("orderValue", orderValue);

        const url = `${
            process.env.NEXT_PUBLIC_API_URL
        }/api/cars?${params.toString()}`;

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
    } catch (error) {
        console.error("Ошибка getAllCars:", error);
        throw new Error("Не удалось загрузить автомобили.");
    }
}

export async function getCarById(id: string): Promise<Car> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`,
        {
            method: "GET",
            cache: "force-cache",
        }
    );

    if (!res.ok) throw new Error("Ошибка загрузки данных");

    return res.json();
}

export async function saveAllCars(
    data: string[],
    token: string
): Promise<Car[]> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/save`, {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/save`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            cache: "no-store",
        }
    );

    if (!res.ok) throw new Error("Ошибка загрузки данных");

    return res.json();
}
