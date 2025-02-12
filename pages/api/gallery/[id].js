

import { deleteGallery, getGallery, updateGallery } from "@/controllers/gallery.controller";
import authorization from "@/middleware/authorization.middleware";
import upload from "@/middleware/upload.middleware";
import verify from "@/middleware/verify.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const result = await getGallery(req);
        res.send(result);
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
      break;

    case "PATCH":
      try {
        verify(req, res, async (err) => {
          if (err) {
            return res.send({
              success: false,
              error: err.message,
            });
          }

          authorization("superAdmin", "admin")(req, res, async (err) => {
            if (err) {
              return res.send({
                success: false,
                error: err.message,
              });
            }

            upload.array("gallery", 5)(req, res, async (err) => {
              if (err) {
                return res.send({
                  success: false,
                  message: err.message,
                });
              }

              const result = await updateGallery(req);
              res.send(result);
            });
          });
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        verify(req, res, async (err) => {
          if (err) {
            return res.send({
              success: false,
              error: err.message,
            });
          }

          authorization("superAdmin", "admin")(req, res, async (err) => {
            if (err) {
              return res.send({
                success: false,
                error: err.message,
              });
            }
          });

          const result = await deleteGallery(req);

          res.send(result);
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
      break;

    default:
      res.send({
        success: false,
        message: "Method not allowed",
      });
      break;
  }
}
