import { addBlog, getBlogs,getClientBlogs } from "@/controllers/blog.controller";
import upload from "@/middleware/upload.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      upload("blog").single("featuredImage")(req, res, async (err) => {
        if (err) {
          console.error("Upload Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        try {
          const result = await addBlog(req);
          res.status(200).json(result);
        } catch (AddBlogError) {
          console.error("AddBlog Error: ", AddBlogError.message);
          res.status(500).json({
            success: false,
            message: AddBlogError.message,
          });
        }
      });
      break;
    case "GET":
      try {


        if (req.query.type === "client") {

          const result = await getClientBlogs(req);
          return res.status(200).json(result);
        }

        const result = await getBlogs(req);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
}
