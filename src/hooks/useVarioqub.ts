/** @format */

"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        ymab?: ((...args: any[]) => void) & { a?: any[] };
    }
}

export const useVarioqub = () => {
    useEffect(() => {
        if (typeof window === "undefined" || window.ymab) return;

        const scriptId = "varioqub-script";
        if (document.getElementById(scriptId)) return; // Если скрипт уже загружен, повторно не загружаем

        const ymabFunc: ((...args: any[]) => void) & { a?: any[] } = (
            ...args: any[]
        ) => {
            (window.ymab!.a = window.ymab!.a || []).push(args);
        };
        ymabFunc.a = [];
        window.ymab = ymabFunc;

        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.src = "https://abt.s3.yandex.net/expjs/latest/exp.js";

        script.addEventListener("error", () => {
            function cb(t: any) {
                t = t[t.length - 1];
                if (typeof t === "function") t({ flags: {} });
            }
            if (Array.isArray(window.ymab!.a)) window.ymab!.a.forEach(cb);
            window.ymab = (...args: any[]) => cb(args);
        });

        document.head.appendChild(script);

        window.ymab("metrika.100089387", "init");

        return () => {
            script.remove();
        };
    }, []);
};
