/** @format */

import type { MetadataRoute } from "next";
import { getCars } from "@/api/cars";
import { seoUrlCarPage } from "@/lib/constants";

export async function generateSitemaps() {
    // Можно настроить пагинацию, если машин очень много
    return [{ id: 0 }];
}

export default async function sitemap({
    id,
}: {
    id: number;
}): Promise<MetadataRoute.Sitemap> {
    // Получаем список всех автомобилей (допустим, API возвращает до 50 000 записей)
    const cars = await getCars();
    if (cars.length === 0) return [];

    return cars.map((car) => ({
        url: `https://autokorean.ru/cars/${car.id}_${car.brand.brand}_${car.model.model}_${seoUrlCarPage}_${car.encarId}`,
        lastModified: new Date().toISOString(), // Можно заменить на car.updatedAt, если есть
    }));
}
