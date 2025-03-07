import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Metadata } from 'next';
import { DangerBtn } from '@/components/DangerBtn';
import { keywords } from '@/lib/constants';
import YandexMetrika from '@/components/YandexMetrika';
import HeaderInner from '@/components/HeaderInner';
import Footer from '@/components/Footer';
import FavoriteLink from '@/components/FavoriteLink';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://autokorean.ru"),
	title: "Авто из Кореи | Купить авто с пробегом в Москве",
	description: "Авто из Кореи под ключ: цены, характеристики, фото. Прямые поставки. Доставка в Москву и другие города.",
	keywords: keywords.split("\n").join(", "),
	alternates: {
		canonical: '/',
	},
	icons: {
		icon: '/favicon.ico'
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
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(100089387, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
              });
            `,
					}}
				/>
				<noscript>
					<div>
						<img
							src="https://mc.yandex.ru/watch/100089387"
							style={{ position: "absolute", left: "-9999px" }}
							alt=""
						/>
					</div>
				</noscript>
			</head>
			<body className={inter.className}>
				<HeaderInner />
				{children}
				<Footer />
				<FavoriteLink />
				<DangerBtn />
			</body>
		</html>
	);
}
