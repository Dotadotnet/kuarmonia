import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function verifyAdmin(req, res, next) {
  try {

    if (!req.headers.cookie) {
      return res.status(401).json({
        success: false,
        message: "غیرمجاز، کوکی یافت نشد",
      });
    }

    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.adminToken; 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "غیرمجاز، توکن یافت نشد",
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "غیرمجاز، توکن نامعتبر است",
        });
      }

      req.admin = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "خطای سرور، لطفاً مجدداً تلاش کنید",
    });
  }
}
