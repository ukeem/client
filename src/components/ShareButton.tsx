"use client";

import { useState } from "react";

export default function ShareButton() {
	const [copied, setCopied] = useState(false);
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: document.title,
					text: "Посмотрите это!",
					url: shareUrl,
				});
			} catch (error) {
				console.error("Ошибка при шаринге:", error);
			}
		} else if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(shareUrl);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (error) {
				console.error("Ошибка копирования:", error);
			}
		} else {
			alert("Ваш браузер не поддерживает Web Share API");
		}
	};

	return (
		<></>
	);
}
