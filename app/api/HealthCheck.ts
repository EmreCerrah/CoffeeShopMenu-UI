import { NextApiRequest, NextApiResponse } from "next";
import { checkServerHealth } from "@/lib/healthCheck";

let isRunning = false;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!isRunning) {
        isRunning = true;
        console.log("⏳ Sağlık kontrolü başlatıldı...");

        setInterval(() => {
            checkServerHealth();
        }, 15 * 60 * 1000); // 15 dakika (milisaniye cinsinden)
    }

    res.status(200).json({ message: "Health check task running"});
}