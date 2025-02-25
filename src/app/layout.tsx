
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import FavoriteLink from '@/components/FavoriteLink';
import { CarsProvider } from '@/context/CarsContext';
// import { Car } from '@/types/Car';
import Footer from '@/components/Footer';
// import { getFilteringCars } from '@/lib/apiRequest';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import data from '@/data/response.json'
import { Car } from '@/types/Car';


const inter = Inter({
	subsets: ['latin', 'cyrillic'],
})

const cars: Car[] = data as Car[];

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	// const cars = await getFilteringCars({})

	return (
		<Suspense fallback={<Loading />}>
			<html lang="ru">
				<body className={inter.className}>
					<CarsProvider initialCars={cars}>
						{children}
						<Footer />
						<FavoriteLink />
					</CarsProvider>
				</body>
			</html>
		</Suspense>
	);
}
