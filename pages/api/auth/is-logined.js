import { isLogined } from "@/controllers/auth.controller";
import { serialize } from 'cookie';

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "POST":
            const result = await isLogined(req);
            res.send(result);
    }
}