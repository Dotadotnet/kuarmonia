import { addTag ,getTags,getTagsForDropDownMenu} from "@/controllers/tag.controller";

export const config = {
  api: {
    bodyParser: true,  
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const result = await addTag(req);
        console.log(result)
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
        if (req.query.type === "dropdown") {
          const result = await getTagsForDropDownMenu();
          console.log(req.query)
          return res.status(200).json(result);
        }
        const result = await getTags(req);
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

