/** @format */

import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
    try {
        const { carName, name, phone } = await req.json();

        if (!name || !phone) {
            return NextResponse.json(
                { error: "Заполните все поля" },
                { status: 400 }
            );
        }

        const text = `
		📩 Новая заявка:  ${new Date().toLocaleString("ru-RU")}\n\n
		👤 Имя:  ${name}\n\n
		📞 Телефон:  ${phone}\n\n
		🚗 Авто:  ${carName}
		`;

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text }),
        });

        if (!response.ok) {
            throw new Error("Ошибка отправки в Telegram");
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
