
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import FavoriteLink from '@/components/FavoriteLink';
import { CarsProvider } from '@/context/CarsContext';
import { Car } from '@/types/Car';
import Footer from '@/components/Footer';
import { getFilteringCars } from '@/lib/apiRequest';


const inter = Inter({
	subsets: ['latin', 'cyrillic'],
})

async function getCars(): Promise<Car[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/cars`,
		{ cache: "force-cache" }
	);
	// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
	const data: Car[] = await response.json();
	return data;
}


export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	// const cars = await getCars()
	const cars = await getFilteringCars({
		limit: 100
	})

	return (
		<html lang="ru">
			<body className={inter.className}>
				<CarsProvider initialCars={cars}>
					{children}
					<Footer />
					<FavoriteLink />
				</CarsProvider>
			</body>
		</html>
	);
}
