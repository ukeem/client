"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import FavoriteLink from '@/components/FavoriteLink';


const inter = Inter({
	subsets: ['latin', 'cyrillic'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<html lang="ru">
			<body className={inter.className}>
				{children}
				<FavoriteLink />
			</body>
		</html>
	);
}
