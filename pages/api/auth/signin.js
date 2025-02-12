import { signIn , sendVerify } from "@/controllers/auth.controller";
import { serialize } from 'cookie';
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
    
      try {
        const result = await signIn(req);
        if (result.success && result.accessToken) {
          res.setHeader('Set-Cookie', serialize('accessToken', result.accessToken, {
            httpOnly: true, 
            sameSite: 'strict', 
            maxAge: 60 * 60 * 24 * 7, 
            path: '/',
          }));
        }
        res.status(200).json(result);
      } catch (signUpError) {
        res.status(500).json({
          success: false,
          message: signUpError.message,
        });
      }
      break;
    default:
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
      break;
  }
}
