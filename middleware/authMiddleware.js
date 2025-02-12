import jwt from 'jsonwebtoken';
import User from '@/models/user.model';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'توکن یافت نشد' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }

    req.user = user; // اطلاعات کاربر به درخواست اضافه می‌شود
    next();
  } catch (error) {
    return res.status(401).json({ message: 'توکن نامعتبر است' });
  }
};
