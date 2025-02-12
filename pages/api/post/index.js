import upload from "@/middleware/upload.middleware";
import { addPost, getPosts,getClientPosts } from "@/controllers/post.controller";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      upload("post").fields([
        { name: "featuredImage", maxCount: 1 },
        { name: "gallery", maxCount: 5 }, 
      ])(req, res, async (err) => {
        if (err) {
          console.error("Upload Error: ", err.message);
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }

        try {
          const result = await addPost(req);
          res.status(200).json(result);
        } catch (AddPostError) {
          console.error("addPost Error: ", AddPostError.message);
          res.status(500).json({
            success: false,
            message: AddPostError.message,
          });
        }
      });
      break;
    case "GET":
      try {


        if (req.query.type === "client") {

          const result = await getClientPosts(req);
          return res.status(200).json(result);
        }

        const result = await getPosts(req);
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
