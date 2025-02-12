import { addGallery, getGalleries, getClientGallery } from "@/controllers/gallery.controller";
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
      try {
        await new Promise((resolve, reject) => {
          upload("gallery").fields([
            { name: "featuredImage", maxCount: 1 },
            { name: "gallery", maxCount: 100 },
          ])(req, res, (err) => {
            if (err) {
              console.error("Upload Error: ", err.message);
              return reject(err);
            }
            resolve();
          });
        });
        console.log("gallery")
         const result = await addGallery(req);
        return res.status(200).json(result);
      } catch (error) {
        console.error("POST Error: ", error.message);
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

    case "GET":
      try {
        if (req.query.type === "client") {
          const result = await getClientGallery();
          return res.status(200).json(result);
        }

        const result = await getGalleries(req);
        return res.status(200).json(result);
      } catch (error) {
        console.error("GET Error: ", error.message);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
}
