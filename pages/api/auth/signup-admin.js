import { signUpAdmin } from "@/controllers/auth.controller";
import upload from "@/middleware/upload.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        upload("user").single("avatar")(req, res, async (err) => {
    if (err) {
      console.error("Upload Error: ", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  
    try {
      const result = await signUpAdmin(req);
      res.status(200).json(result);
    } catch (signUpError) {
      console.error("SignUp Error: ", signUpError.message);
      res.status(500).json({
        success: false,
        message: signUpError.message,
      });
    }
  });

      } catch (error) {
        console.error("Handler Error: ", error.message);
        res.status(500).json({
          success: false,
          message: error.message,
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
