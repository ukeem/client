import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://autokorean.ru"),
	title: "Авто из Кореи | Купить авто с пробегом в Москве",
	description: "Авто из Кореи под ключ: цены, характеристики, фото. Прямые поставки. Доставка в Москву и другие города.",
	keywords: "авто из кореи, корейские автомобили, купить авто с пробегом, авто под ключ",
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: "Авто из Кореи | Купить авто с пробегом в Москве",
		description: "Авто из Кореи под ключ: цены, характеристики, фото. Прямые поставки.",
		url: "https://autokorean.ru/",
		type: "website",
		images: [{ url: '/no_image.jpg', width: 1200, height: 630, alt: "Авто из Кореи" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Авто из Кореи | Купить авто с пробегом",
		description: "Большой выбор автомобилей из Кореи с доставкой в Россию.",
		images: ['/no_image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'UYclNSbHIej7iB6jCtJhWxPUgFWqDWIHSll5hvjs75w',
		yandex: '09e48c8fb0e880ec',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (

		<html lang="ru">
			<body className={inter.className}>
				{children}
			</body>
		</html>
	);
}
