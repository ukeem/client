/** @format */

import { User, UserLogin } from "@/types/User";

export const login = async (data: User): Promise<UserLogin> => {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Ошибка загрузки данных");

    return res.json();
};
