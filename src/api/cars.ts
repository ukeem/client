/** @format */

"use server";

import { Car } from "@/types/Car";

export async function getCars(limit = 9, offset = 0): Promise<Car[]> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/filter`, {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars/filter`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ limit, offset }),
            cache: "no-store",
        }
    );

    if (!res.ok) throw new Error("Ошибка загрузки данных");

    return res.json();
}

export async function getAllCars(): Promise<Car[]> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`, {
        method: "GET",
        cache: "force-cache",
    });

    if (!res.ok) throw new Error("Ошибка загрузки данных");

    return res.json();
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
