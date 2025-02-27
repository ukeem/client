/** @format */

import { NextResponse } from "next/server";
import { getCars } from "@/api/cars";

export async function GET() {
    const cars = await getCars(50, 0, "price", "DESC"); // Берем 50 авто
    const urls = cars.map(
        (car) => `<url><loc>https://example.com/cars/${car.id}</loc></url>`
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://example.com/</loc></url>
    ${urls.join("\n")}
  </urlset>`;

    return new NextResponse(sitemap, {
        headers: { "Content-Type": "application/xml" },
    });
}
