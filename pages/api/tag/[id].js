import { getTag, updateTag, deleteTag } from "@/controllers/tag.controller";
import authorization from "@/middleware/authorization.middleware";
import verify from "@/middleware/verify.middleware";

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true
  }
};

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const result = await getTag(req);
        return res.status(200).json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
      break;
    case "DELETE":
      try {
        console.log("awdawd");

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
          });
          console.log("22222");

          const result = await deleteTag(req);

          res.send(result);
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message
        });
      }
      break;

    case "PATCH":
      try {
        const result = await updateTag(req);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
