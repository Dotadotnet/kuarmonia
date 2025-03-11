import { signInPhone } from "@/controllers/authUser.controller";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    
    case "POST":
      try {
        console.log(req.body)
        const result = await signInPhone(req);

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
