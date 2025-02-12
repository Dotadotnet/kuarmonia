

import { signInAdmin } from "@/controllers/auth.controller";
import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const result = await signInAdmin(req);

        if (result.success && result.accessToken) {
          res.setHeader('Set-Cookie', serialize('accessToken', result.accessToken, {
            httpOnly: true, 
            sameSite: 'strict', 
            maxAge: 60 * 60 * 24 * 7, 
            path: '/',
          }));
        }

        res.send(result);
      } catch (error) {
        res.send({
          success: false,
          error: error.message,
        });
      }
      break;

    default:
      res.status(405).send({
        success: false,
        error: "Method not allowed",
      });
      break;
  }
}