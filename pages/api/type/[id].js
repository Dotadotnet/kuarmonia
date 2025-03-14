import { updateType ,removeType} from "@/controllers/type.controller";
import authorization from "@/middleware/authorization.middleware";
import verifyAdmin from "@/middleware/verifyAdmin.middleware";

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true
  }
};

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "PATCH":
      try {
        const result = await updateType(req);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    case "DELETE":
      try {
        verifyAdmin(req, res, async (err) => {
          if (err) {
            return res.send({
              success: false,
              error: err.message
            });
          }

          authorization("superAdmin", "admin")(req, res, async (err) => {
            if (err) {
              return res.send({
                success: false,
                error: err.message
              });
            }
          });

          const result = await removeType(req);

          res.send(result);
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message
        });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
