import {
  addTradeType,
  getTradeTypes,
  getAllTradeTypes
} from "@/controllers/tradeType.controller";

export const config = {
  api: {
    bodyParser: true
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const result = await addTradeType(req);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message
        });
      }
      break;

    case "GET":
      try {
        // بررسی که اگر نوع جستجو "all" باشد، تمامی نوع‌ها را باز می‌گرداند
        if (req.query.type === "all") {
          const result = await getAllTradeTypes(req);
          return res.status(200).json(result);  // باید نتیجه را ارسال کنید
        }

        // در غیر این صورت، داده‌های صفحه‌بندی شده را دریافت کنید
        const result = await getTradeTypes(req);
        return res.status(200).json(result);  // ارسال نتیجه به کلاینت
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
      break;

    default:
      return res.status(405).json({
        success: false,
        message: "Method not allowed"
      });
  }
}
