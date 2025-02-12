import Category from '@/models/category.model';

// Add a new category
export async function addCategory(req) {
  try {
    const { title, description ,authorId} = req.body;

    const category = await Category.create({
      title,
      description,
      authorId
    });
    if (category) {
      return {
        success: true,
        message: "دسته بندی با موفقیت ایجاد شد",
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت دسته بندی",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getCategories(req) {
  try {

    const { page = 1, limit = 7, search = "" } = req.query; 
    const skip = (page - 1) * limit;
console.log(search)
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

      const categories = await Category.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate('authorId', 'name avatar.url') 
      .select('_id categoryId title description slug createdAt status ');
  
console.log(categories);
  
    const total = await Category.countDocuments(searchQuery);
    if (categories.length > 0) {
      return {
        success: true,
        data: categories,
        total: total,
        message: "دسته بندی با موفقیت دریافت شد",
      };
    } else {
      return {
        success: false,
        message: "هیچ دسته بندی یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getCategoriesForDropDownMenu() {
  try {
    const categories = await Category.find({ isDeleted: false, status: 'active' }).select('id title description');

    if (categories.length > 0) {
      return {
        success: true,
        data: categories,
        message: "دسته‌بندی‌ها با موفقیت برای DropDownMenu دریافت شدند",
      };
    } else {
      return {
        success: false,
        message: "هیچ دسته‌بندی فعال برای DropDownMenu یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateCategory(req) {


  try {
    const { id } = req.query;
    console.log(req.body)

    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const category = await Category.findByIdAndUpdate(id, updateFields, { new: true });

    if (category) {
      return {
        success: true,
        message: "دسته‌بندی با موفقیت به‌روزرسانی شد",
        data: category,
      };
    } else {
      return {
        success: false,
        message: "دسته‌بندی پیدا نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
