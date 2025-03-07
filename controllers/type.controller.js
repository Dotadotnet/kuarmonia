import PropertyType from "@/models/propertyType.model";

// Add a new type
export async function addType(req) {
  try {
    const { title, description, authorId ,features} = req.body;
console.log(title, description, authorId,features);
    const type = await PropertyType.create({
      title,
      description,
      authorId,
      features
    });
    if (type) {
      return {
        success: true,
        message: "نوع ملک با موفقیت ایجاد شد"
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت نوع ملک"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getTypes(req) {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    const types = await PropertyType.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("authorId", "name avatar.url")
      .select("_id typeId title description features slug createdAt status ");


    const total = await PropertyType.countDocuments(searchQuery);
    if (types.length > 0) {
      return {
        success: true,
        data: types,
        total: total,
        message: "انواع  املاک با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ نوع ملکی یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}



export async function updateType(req) {
  try {
    const { id } = req.query;

    const { title, description, status,features, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (features !== undefined) updateFields.features = features;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const type = await PropertyType.findByIdAndUpdate(id, updateFields, { new: true });

    if (type) {
      return {
        success: true,
        message: "نوع ملک با موفقیت به‌روزرسانی شد",
        data: type
      };
    } else {
      return {
        success: false,
        message: "نوع ملک پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
