import upload from "@/middleware/upload.middleware";
import {
  addProperty,
  getProperties,
  getClientProperties
} from "@/controllers/property.controller";
import verifyAdmin from "@/middleware/verifyAdmin.middleware";
import authorization from "@/middleware/authorization.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      upload("property").fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "gallery", maxCount: 5 }
      ])(req, res, async (err) => {
        if (err) {
          console.error("Upload Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }

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
              const result = await addProperty(req);
              res.status(200).json(result);
            });
          });
        } catch (AddPropertyError) {
          console.error("addProperty Error: ", AddPropertyError.message);
          res.status(500).json({
            success: false,
            message: AddPropertyError.message
          });
        }
      });
      break;
    case "GET":
      try {
        if (req.query.type === "sale") {
          const saleTypes = await getSaleTypes(req);
          return res.status(200).json(saleTypes);
        }

        if (req.query.type === "trade") {
          const tradeTypes = await getTradeTypes(req);
          return res.status(200).json(tradeTypes);
        }
        if (req.query.type === "type") {
          const tradeTypes = await getpropertyType(req);
          return res.status(200).json(tradeTypes);
        }
        if (req.query.type === "client") {
          const propries = await getClientProperties(req);
          return res.status(200).json(propries);
        }

        const result = await getProperties(req);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed"
      });
  }
}
