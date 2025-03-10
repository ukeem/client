/** @format */

"use server";

import { Car } from "@/types/Car";
// import fs from "fs/promises";
// import path from "path";

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
        // `${process.env.NEXT_PUBLIC_API_URL}/cars/filter`,
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

export async function getAllCarsForFilter(): Promise<Car[]> {
    // const url = `${process.env.NEXT_PUBLIC_API_URL}/cars/getfilter`;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/getfilter`;

    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(
            `Ошибка загрузки данных: ${res.status} ${res.statusText}`
        );
    }

    return await res.json();
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
        cache: "no-store",
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
        // `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`,
        {
            method: "GET",
            cache: "no-store",
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

    // try {
    //     const filePath = path.join(process.cwd(), "/public/response.json");
    //     const data = JSON.parse(await fs.readFile(filePath, "utf-8"));

    //     // Фильтруем массив, удаляя машину с соответствующим id
    //     const updatedData = data.filter((car: Car) => car.id !== Number(id));

    //     // Записываем обновленные данные обратно в файл
    //     await fs.writeFile(
    //         filePath,
    //         JSON.stringify(updatedData, null, 2),
    //         "utf-8"
    //     );
    // } catch (error) {
    //     console.error("Ошибка обновления response.json:", error);
    // }

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
            cache: "no-store",
        }
    );

    if (!res.ok) throw new Error("Ошибка при поиске новых автомобилей");

    return res.json();
}

export async function getDataFileJSON(): Promise<Car[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/data/response.json`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error(
            `Ошибка загрузки JSON данных: ${res.status} ${res.statusText}`
        );
    }

    return await res.json();
}
