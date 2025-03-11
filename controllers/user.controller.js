import Cart from "@/models/cart.model";
import Favorite from "@/models/favorite.model";
import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import Review from "@/models/review.model";
import User from "@/models/admin.model";
import removePhoto from "@/utils/remove.util";

// دریافت تمام کاربران
export async function getUsers() {
  try {
    const admins = await User.find().populate([
      "rents",
      {
        path: "purchases",
        populate: [
          "admin",
          {
            path: "rent",
            populate: ["admins", "owner", "reviews"],
          },
        ],
      },
    ]);

    if (admins) {
      return {
        success: true,
        message: "کاربران با موفقیت دریافت شدند",
        data: admins,
      };
    } else {
      return {
        success: false,
        message: "دریافت کاربران با شکست مواجه شد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getUser(req) {
  try {
    const admin = await User.findById(req.query.id);

    if (admin) {
      return {
        success: true,
        message: "اطلاعات کاربر با موفقیت دریافت شد",
        data: admin,
      };
    } else {
      return {
        success: false,
        message: "دریافت اطلاعات کاربر با شکست مواجه شد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// بروزرسانی اطلاعات کاربر
export async function updateUser(req) {
  try {
    const admin = await User.findById(req.query.id);

    if (!admin) {
      return {
        success: false,
        message: "کاربر پیدا نشد",
      };
    } else {
      const updatedUser = { ...req.body };

      if (admin.role === 'superAdmin') {
        if (updatedUser.role || updatedUser.status === 'inActive') {
          return {
            success: false,
            message: "نمی‌توانید نقش یا وضعیت کاربر با نقش مدیر کل را تغییر دهید",
          };
        }
      }

      // بروزرسانی تصویر کاربر در صورت آپلود فایل جدید
      if (req.file && req.file.path && req.file.filename) {
        await removePhoto(admin.avatar.public_id);

        updatedUser.avatar = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      const result = await User.findByIdAndUpdate(admin._id, {
        $set: updatedUser,
      });

      if (result) {
        return {
          success: true,
          message: "اطلاعات کاربر با موفقیت بروزرسانی شد",
        };
      } else {
        return {
          success: false,
          message: "بروزرسانی اطلاعات کاربر با شکست مواجه شد",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}


// حذف یک کاربر
export async function deleteUser(req) {
  try {
    // ابتدا کاربر را پیدا می‌کنیم
    const admin = await User.findById(req.query.id);

    if (!admin) {
      return {
        success: false,
        message: "کاربر پیدا نشد",
      };
    }

    // بررسی نقش superAdmin
    if (admin.role === 'superAdmin') {
      return {
        success: false,
        message: "حذف کاربر با نقش مدیر کل مجاز نیست",
      };
    }

    // اگر کاربر superAdmin نبود، کاربر حذف می‌شود
    await User.findByIdAndDelete(req.query.id);

    await removePhoto(admin.avatar.public_id);

    // حذف لیست علاقه‌مندی‌های کاربر
    if (admin.favorite) {
      await Favorite.findByIdAndDelete(admin.favorite);
    }

    // حذف سبد خرید کاربر
    if (admin.cart) {
      await Cart.findByIdAndDelete(admin.cart);
    }

    // حذف کاربر از تمام اجاره‌ها
    if (admin.rents.length > 0) {
      for (let i = 0; i < admin.rents.length; i++) {
        const rent = await Rent.findByIdAndDelete(admin.rents[i]);

        rent.gallery.forEach(async (image) => await removePhoto(image.public_id));

        // حذف از سبد خرید تمام کاربران
        await Cart.updateMany(
          {},
          {
            $pull: {
              rents: rent._id,
            },
          }
        );

        // حذف از لیست علاقه‌مندی‌های تمام کاربران
        await Favorite.updateMany(
          {},
          {
            $pull: {
              rents: rent._id,
            },
          }
        );

        rent.admins.forEach(async (admin) => {
          const review = await Review.findOne({ reviewer: admin });
          const purchase = await Purchase.findOne({ admin: admin });

          if (review) {
            await User.findByIdAndUpdate(review.reviewer, {
              $pull: {
                reviews: review?._id,
              },
            });
          }

          if (purchase) {
            await User.findByIdAndUpdate(purchase.admin, {
              $pull: {
                purchases: purchase?._id,
              },
            });
          }

          // حذف از لیست خریدها
          await Purchase.deleteMany({ rent: rent._id });

          // حذف از لیست نظرات
          await Review.deleteMany({ rent: rent._id });
        });
      }
    }

    // حذف خریدهای کاربر
    if (admin.purchases.length > 0) {
      for (let i = 0; i < admin.purchases.length; i++) {
        await Purchase.findByIdAndDelete(admin.purchases[i]);
      }
    }

     // حذف بلاگ های کاربر
   
     if (admin.blogs.length > 0) {
      for (let i = 0; i < admin.blogs.length; i++) {
        await Purchase.findByIdAndUpdate(admin.blogs[i], { isDeleted: true });
      }
    }

    // حذف نظرات کاربر
    if (admin.reviews.length > 0) {
      for (let i = 0; i < admin.reviews.length; i++) {
        await Review.findByIdAndDelete(admin.reviews[i]);
      }
    }

    return {
      success: true,
      message: "کاربر با موفقیت حذف شد",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
