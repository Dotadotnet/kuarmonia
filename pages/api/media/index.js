import upload from "@/middleware/upload.middleware";
import {
  addMedia,
  getMedias,
  getClientMedias
} from "@/controllers/media.controller";
import verify from "@/middleware/verifyAdmin.middleware";
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
      upload("media").fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "media", maxCount: 1 }
      ])(req, res, async (err) => {
        if (err) {
          console.error("Upload Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }

        try {
          verify(req, res, async (err) => {
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

              const result = await addMedia(req);
              res.send(result);
            });
          });
        } catch (AddMediaError) {
          console.error("addMedia Error: ", AddMediaError.message);
          res.status(500).json({
            success: false,
            message: AddMediaError.message
          });
        }
      });
      break;
    case "GET":
      try {
        if (req.query.type === "client") {
          const result = await getClientMedias(req);
          return res.status(200).json(result);
        }
        const result = await getMedias(req);
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
