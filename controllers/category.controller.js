import Category from "@/models/category.model";

// Add a new category
export async function addCategory(req) {
  try {
    const { title, description } = req.body;
    const category = await Category.create({
      title,
      description,
      authorId: req.user._id
    });
    if (category) {
      return {
        success: true,
        message: "دسته بندی با موفقیت ایجاد شد"
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت دسته بندی"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getCategories(req) {
  try {
    const { page = 1, limit = 7, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    const categories = await Category.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("authorId", "name avatar.url")
      .select("_id categoryId title description slug createdAt status ");

    const total = await Category.countDocuments(searchQuery);
    if (categories.length > 0) {
      return {
        success: true,
        data: categories,
        total: total,
        message: "دسته بندی با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ دسته بندی یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getCategoriesForDropDownMenu() {
  try {
    const categories = await Category.find({
      isDeleted: false,
      status: "active"
    }).select("id title description");

    if (categories.length > 0) {
      return {
        success: true,
        data: categories,
        message: "دسته‌بندی‌ها با موفقیت برای DropDownMenu دریافت شدند"
      };
    } else {
      return {
        success: false,
        message: "هیچ دسته‌بندی فعال برای DropDownMenu یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
export async function getCategory(req) {
  try {
    const result = await Category.findById(req.query.id);
    if (result) {
      return {
        success: true,
        message: "اطلاعات دسته بندی با موفقیت دریافت شد",
        data: result
      };
    } else {
      return {
        success: false,
        message: "دریافت دسته بندی  با شکست مواجه شد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function updateCategory(req) {
  try {
    const category = await Category.findById(req.query.id);
    const updatedCategory = req.body;
    const result = await Category.findByIdAndUpdate(category._id, {
      $set: updatedCategory
    });

    if (result) {
      return {
        success: true,
        message: "دسته‌بندی با موفقیت به‌روزرسانی شد",
        data: result
      };
    } else {
      return {
        success: false,
        message: "دسته‌بندی پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function deleteCategory(req) {
  try {
    const category = await Category.findByIdAndUpdate(
      req.query.id,
      { isDeleted: true },
      { new: true }
    );

    if (category) {
      return {
        success: true,
        message: "دسته بندی با موفقیت حذف شد",
        data: tag
      };
    } else {
      return {
        success: false,
        message: "دسته بندی پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
