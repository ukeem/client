/** @format */

import type { MetadataRoute } from "next";
import { getCars } from "@/api/cars";
import { seoUrlCarPage } from "@/lib/constants";

export async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Основные страницы сайта
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: "https://autokorean.ru/",
            lastModified: new Date().toISOString(),
            changeFrequency: "yearly", // ✅ Исправлено
            priority: 1,
        },
        {
            url: "https://autokorean.ru/cars",
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly", // ✅ Исправлено
            priority: 0.8,
        },
        {
            url: "https://autokorean.ru/filter",
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly", // ✅ Исправлено
            priority: 0.5,
        },
    ];

    // Динамические страницы автомобилей
    const cars = await getCars();
    if (cars.length === 0) return staticPages;

    const carPages: MetadataRoute.Sitemap = cars.map((car) => ({
        url: `https://autokorean.ru/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`,
        lastModified: new Date().toISOString(), // Можно заменить на car.updatedAt, если есть
    }));

    return [...staticPages, ...carPages];
}
