import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import FavoriteLink from "@/components/FavoriteLink";
import { CarsProvider } from "@/context/CarsContext";
import Footer from "@/components/Footer";
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<Loading />}>
			<html lang="ru">
				<body className={inter.className}>
					<CarsProvider>
						{children}
						<Footer />
						<FavoriteLink />
					</CarsProvider>
				</body>
			</html>
		</Suspense>
	);
}
