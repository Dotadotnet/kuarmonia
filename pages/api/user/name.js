import { addName } from "@/controllers/authUser.controller";
import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        
        const result = await addName(req);
        
        if (result.success) {
          const { accessToken } = result; 

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", accessToken, {
              httpOnly: true, 
              secure: process.env.NODE_ENV === "production",
              maxAge: 7 * 24 * 60 * 60, 
              path: "/",
              sameSite: "strict",
            })
          );
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
