import SaleType from "@/models/saleType.model";

// Add a new type
export async function addSaleType(req) {
  try {
    const { title, description } = req.body;
    console.log(req.body)
    const type = await SaleType.create({
      title,
      description,
      creator:req.admin._id
    });
    if (type) {
      return {
        success: true,
        message: "نوع فروش ملک با موفقیت ایجاد شد"
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

export async function getSaleTypes(req) {
  try {
    const { page = 1, limit = 7, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    const types = await SaleType.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("creator", "name avatar.url")
      .select("_id typeId title description slug createdAt status ");


    const total = await SaleType.countDocuments(searchQuery);
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



export async function updateSaleType(req) {
  try {
    const { id } = req.query;

    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const type = await SaleType.findByIdAndUpdate(id, updateFields, { new: true });

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





export async function removeSaleType(req) {
  try {
    const type = await SaleType.findByIdAndUpdate(
      req.query.id,
      { isDeleted: true },
      { new: true }
    );

    if (type) {
      return {
        success: true,
        message: "نوع فروش  با موفقیت حذف شد",
        data: type
      };
    } else {
      return {
        success: false,
        message: "نوع فروش پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
