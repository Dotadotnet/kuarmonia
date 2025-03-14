import {
  addTradeType,
  getTradeTypes,
} from "@/controllers/tradeType.controller";
import authorization from "@/middleware/authorization.middleware";
import verifyAdmin from "@/middleware/verifyAdmin.middleware";

export const config = {
  api: {
    bodyParser: true
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        verifyAdmin(req, res, async (err) => {
          if (err) {
            console.log(req.body);
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
            const result = await addTradeType(req);
            res.status(200).json(result);
          });
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message
        });
      }
      break;

    case "GET":
      try {
        const result = await getTradeTypes(req);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
      break;

    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed"
      });
  }
}
