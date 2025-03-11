import jwt from 'jsonwebtoken';
import User from '@/models/admin.model';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'توکن یافت نشد' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }
    if(decoded.role == 'admin'){
      return res.status(500).json({ message: "شما به این بخش نمی توانید دسترسی داشته باشید" });
    }
    req.admin = admin; // اطلاعات کاربر به درخواست اضافه می‌شود
  } catch (error) {
    return res.status(401).json({ message: 'توکن نامعتبر است' });
  }
};
