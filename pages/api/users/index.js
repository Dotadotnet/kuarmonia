import { getUsers } from "@/controllers/user.controller";
import authorization from "@/middleware/authorization.middleware";
import verify from "@/middleware/verify.middleware";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        verify(req, res, async (err) => {
          if (err) {
            return res.status(401).send({
              success: false,
              error: err.message,
            });
          }

          authorization("superAdmin", "admin")(req, res, async (err) => {
            if (err) {
              return res.status(403).send({
                success: false,
                error: err.message,
              });
            }

            const result = await getUsers();

            // فیلتر کاربران بر اساس نقش admin
            if (req.user.role === "admin") {
              const filteredUsers = result.data.filter(
                (user) => user.role !== "superAdmin"
              );
              return res.status(200).send({
                success: true,
                data: filteredUsers,
              });
            } else {
              return res.status(200).send({
                success: true,
                data: result.data,
              });
            }
          });
        });
      } catch (error) {
        return res.status(500).send({
          success: false,
          error: error.message,
        });
      }
      break;

    default:
      return res.status(405).send({
        success: false,
        error: "Method not allowed",
      });
  }
}
