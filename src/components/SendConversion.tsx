"use client";

import { useEffect } from "react";

export default function SendConversion() {
	useEffect(() => {
		if (typeof window !== "undefined" && typeof window.ym === "function") {
			window.ym(100089387, "reachGoal", "TARGET_NAME");
		}
	}, []);

	return null;
}
