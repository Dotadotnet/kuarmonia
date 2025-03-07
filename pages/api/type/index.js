import { addType, getTypes, softDeleteType } from "@/controllers/type.controller";

export const config = {
  api: {
    bodyParser: true,  
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const result = await addType(req);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;

    case "GET":
      try {
  
        const result = await getTypes(req);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }
      break;
      
    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
  }
}
