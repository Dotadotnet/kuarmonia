import { addSlide, getSlides, getClientSlides } from "@/controllers/slide.controller";
import upload from "@/middleware/upload.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const handleError = (res, message, status = 500) => {
  console.error(message);
  return res.status(status).json({
    success: false,
    message,
  });
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      upload("slide").single("bgImg")(req, res, async (err) => {
        if (err) {
          return handleError(res, `Upload Error: ${err.message}`, 400);
        }
        console.log("recev image handler")

        try {
          const result = await addSlide(req);
          res.status(200).json(result);
        } catch (AddSlideError) {
          return handleError(res, `AddSlide Error: ${AddSlideError.message}`);
        }
      });
      break;

    case "GET":
      console.log("GET request received, query: ", req.query);
      try {
        if (req.query.type === "client") {
          const result = await getClientSlides(req);
          return res.status(200).json(result);
        }
        const result = await getSlides(req);
        return res.status(200).json(result);
      } catch (error) {
        return handleError(res, `GET Error: ${error.message}`);
      }

    default:
      return handleError(res, "Method not allowed", 405);
  }
}
