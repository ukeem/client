/** @format */

import { Car } from "@/types/Car";
import { FilterCar } from "@/types/Filter";
import { User, UserLogin } from "@/types/User";

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
    throw new Error("NEXT_PUBLIC_API_URL не задан в .env файле");
}

type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface Options {
    method: Method;
    headers: Record<string, string>;
    body?: string | FormData;
    cache?: RequestCache;
}

export const apiRequest = async <T>(
    endpoint: string,
    method: Method,
    body?: object | FormData,
    token?: string
): Promise<T> => {
    if (!endpoint.startsWith("/")) {
        throw new Error("Endpoint должен начинаться с '/'");
    }

    const options: Options = {
        method,
        headers: {
            Accept: "application/json",
        },
        cache: "force-cache",
    };

    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (body instanceof FormData) {
        options.body = body;
    } else if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(`${API}${endpoint}`, options);

        if (!response.ok) {
            let errorMessage = `Ошибка запроса ${API}`;

            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // Сервер не вернул JSON, оставляем стандартное сообщение
            }

            throw new Error(errorMessage);
        }

        if (response.status === 204) {
            return null as T;
        }

        return response.json() as Promise<T>;
    } catch (error) {
        console.error("API Error:", (error as Error).message);
        throw error;
    }
};
export const getFilteringCars = (filter?: FilterCar): Promise<Car[]> => {
    return apiRequest<Car[]>("/cars/filter", "POST", filter);
};

export const getCar = (id: string): Promise<Car> => {
    return apiRequest<Car>(`/cars/${id}`, "GET");
};

export const getAllCars = (): Promise<Car[]> => {
    return apiRequest<Car[]>(`/cars`, "GET");
};

export const login = (data: User): Promise<UserLogin> => {
    return apiRequest<UserLogin>(`/login`, "POST", data);
};

export const fetchAllCars = (data: string[], token: string): Promise<Car[]> => {
    return apiRequest<Car[]>(`/cars/save`, "POST", { carIds: data }, token);
};
