"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function YandexMetrika() {
	useEffect(() => {
		if (typeof window !== "undefined" && typeof ym !== "undefined") {
			ym(100089387, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
		}
	}, []);

	return (
		<>
			{/* Подключение скрипта Яндекс.Метрики */}
			<Script
				id="yandex-metrika"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(100089387, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
                `,
				}}
			/>
			<noscript>
				<div>
					<img src="https://mc.yandex.ru/watch/100089387" style={{ position: "absolute", left: "-9999px" }} alt="" />
				</div>
			</noscript>
		</>
	);
}
function ym(arg0: number, arg1: string, arg2: { clickmap: boolean; trackLinks: boolean; accurateTrackBounce: boolean; webvisor: boolean; }) {
	throw new Error('Function not implemented.');
}

declare global {
	interface Window {
		ym: any;
	}
}
