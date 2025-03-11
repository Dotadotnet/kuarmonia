

import { persistAdmin} from "@/controllers/authAdmin.controller";
import verify from "@/middleware/verifyAdmin.middleware";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        verify(req, res, async (err) => {
          if (err) {
            console.log(req.admin)
            return res.send({
              success: false,
              error: err.message,
            });
          } else {
            const result = await persistAdmin(req);
            res.send(result);
          }
        });
      } catch (error) {
        res.send({
          success: false,
          error: error.message,
        });
      }
      break;

    default:
      res.send({
        success: false,
        error: "روش صحیح نیست",
      });
      break;
  }
}
