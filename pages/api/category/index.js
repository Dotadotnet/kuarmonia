import { addCategory, getCategories, getCategoriesForDropDownMenu, softDeleteCategory } from "@/controllers/category.controller";
import authorization from "@/middleware/authorization.middleware";
import verify from "@/middleware/verifyAdmin.middleware";

export const config = {
  api: {
    bodyParser: true,  
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
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

            const result = await addCategory(req);
            res.send(result);
          });
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
      break;

    case "GET":
      try {
        if (req.query.type === "dropdown") {
          const result = await getCategoriesForDropDownMenu();
          return res.status(200).json(result);
        }
        const result = await getCategories(req);
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
