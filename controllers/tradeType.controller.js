import TradeType from "@/models/tradeType.model";

// Add a new tradeTradeType
export async function addTradeType(req) {
  try {
    const { title, description,priceFields } = req.body;
    const tradeType = await TradeType.create({
      title,
      description,
      creator:req.admin._id,
      priceFields: priceFields || [],
    });
    if (tradeType) {
      return {
        success: true,
        message: "نوع نوع معامله با موفقیت ایجاد شد"
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت نوع نوع معامله"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getTradeTypes(req) {
  try {
    const { page = 1, limit = 7, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    const tradeTypes = await TradeType.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("creator", "name avatar.url")
      .select("_id tradeTypeId priceFields title description slug createdAt status ");


    const total = await TradeType.countDocuments(searchQuery);
    if (tradeTypes.length > 0) {
      return {
        success: true,
        data: tradeTypes,
        total: total,
        message: "انواع  املاک با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ نوع نوع معاملهی یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getAllTradeTypes(req) {
  try {
 
    const tradeTypes = await TradeType.find()
      .populate("creator", "name avatar.url")
      .select("_id tradeTypeId priceFields title description slug createdAt status ");


    if (tradeTypes.length > 0) {
      return {
        success: true,
        data: tradeTypes,
        message: "انواع  املاک با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ نوع نوع معامله ای یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}


export async function updateTradeType(req) {
  try {
    const { id } = req.query;
    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const tradeType = await TradeType.findByIdAndUpdate(id, updateFields, { new: true });

    if (tradeType) {
      return {
        success: true,
        message: " نوع معامله با موفقیت به‌روزرسانی شد",
        data: tradeType
      };
    } else {
      return {
        success: false,
        message: " نوع معامله پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
export async function removeTradeType(req) {
  try {
    const type = await TradeType.findByIdAndUpdate(
      req.query.id,
      { isDeleted: true },
      { new: true }
    );

    if (type) {
      return {
        success: true,
        message: "نوع معامله با موفقیت حذف شد",
        data: type
      };
    } else {
      return {
        success: false,
        message: "نوع معامله پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}