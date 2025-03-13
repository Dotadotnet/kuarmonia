import { signInGoogle } from "@/controllers/authUser.controller";
import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const result = await signInGoogle(req);
        if (result.success) {
          const { accessToken } = result;
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", accessToken, {
              httpOnly: true,
              maxAge: 7 * 24 * 60 * 60,
              path: "/",
              secure: false,
              
            })
          );
          console.log("Set-Cookie Header:", res.getHeader("Set-Cookie"));

        }
        res.send(result);
      } catch (error) {
        res.send({
          success: false,
          error: error.message
        });
      }
      break;

    default:
      res.status(405).send({
        success: false,
        error: "Method not allowed"
      });
      break;
  }
}
