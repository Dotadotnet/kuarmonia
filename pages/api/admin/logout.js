import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {


        res.setHeader(
          "Set-Cookie",
          cookie.serialize("adminToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 0,
            path: "/",
            sameSite: "strict"
          })
        );

        res
          .status(200)
          .json({ success: true, message: "خروج موفقیت‌آمیز بود" });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
      break;

    default:
      res.status(405).json({
        success: false,
        error: "روش صحیح نیست"
      });
      break;
  }
}
