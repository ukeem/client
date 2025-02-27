/** @format */

import type { MetadataRoute } from "next";
import { getCars } from "@/api/cars";
import { seoUrlCarPage } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Основные страницы
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: "https://autokorean.ru/",
            lastModified: new Date().toISOString(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://autokorean.ru/cars",
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://autokorean.ru/filter",
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
    ];

    // Динамические страницы автомобилей
    const cars = await getCars(50000);
    if (cars.length === 0) return staticPages;

    const carPages: MetadataRoute.Sitemap = cars.map((car) => ({
        url: `https://autokorean.ru/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`,
        lastModified: new Date().toISOString(), // Можно заменить на car.updatedAt
    }));

    return [...staticPages, ...carPages];
}
