// controllers/property.controller.js
import Property from "@/models/property.model";
import Like from "@/models/like.model";
import User from "@/models/user.model";
import path from "path";
import SaleType from "@/models/saleType.model"; // مدل saleType
import TradeType from "@/models/tradeType.model"; // مدل tradeType
import PropertyType from "@/models/propertyType.model";
export async function addProperty(req) {
  try {
    const {
      title,
      description,
      summary,
      createDate,
      square,
      bathroom,
      bedroom,
      currency,
      saleType,
      tradeType,
      propertyType,
      category,
      isFeatured,
      selectedLocation,
      variants,
      tags,
      features,
      authorId  
    } = req.body;

    let thumbnail = null;
    let gallery = [];

    // پردازش تصاویر
    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
  
    if (req.uploadedFiles["gallery"] && req.uploadedFiles["gallery"].length > 0) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key
      }));
    }


    const property = await Property.create({
      title,
      description,
      summary,
      createDate,
      square,
      bathrooms:bathroom,
      bedroom:bedroom,
      currency,
      tradeType,
      type:propertyType,
      saleType:saleType,
      category,
      isFeatured,
      location :JSON.parse(selectedLocation),
      features: JSON.parse(features), 
      tags,
      thumbnail,
      gallery,
      variants:JSON.parse(variants),
      authorId: authorId
    });

    return {
      success: true,
      message: "پست با موفقیت ایجاد شد",
      data: property
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getProperties(req) {
  try {
    const { page = 1, limit = 7, search = "", userId } = req.query;
    const skip = (page - 1) * limit;
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "کاربر پیدا نشد"
      };
    }

    const isSuperAdmin = user.role === "superAdmin";

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            {  }
          ],
          isDeleted: false
        }
      : { isDeleted: false };
    if (!isSuperAdmin) {
      searchQuery.authorId = userId;
    }
    const propertys = await Property.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("authorId", "name avatar.url")
      .select(
        "_id propertyId title createdAt  views likes dislikes status likeCount dislikeCount thumbnail"
      );

    const total = await Property.countDocuments(searchQuery);

    if (propertys.length > 0) {
      return {
        success: true,
        data: propertys,
        total,
        message: "پست‌ها با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ پستی یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
// تابع برای دریافت Sale Types
export async function getSaleTypes(req) {
  try {
    const saleTypes = await SaleType.find();
    if (saleTypes.length > 0) {
      return {
        success: true,
        data: saleTypes,
        message: "Sale Types retrieved successfully"
      };
    } else {
      return {
        success: false,
        message: "No Sale Types found"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// تابع برای دریافت Trade Types
export async function getTradeTypes(req) {
  try {
    const tradeTypes = await TradeType.find();

    if (tradeTypes.length > 0) {
      return {
        success: true,
        data: tradeTypes,
        message: "Trade Types retrieved successfully"
      };
    } else {
      return {
        success: false,
        message: "No Trade Types found"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// تابع برای دریافت Property Types
export async function getpropertyType(req) {
  try {
    const propertyTypes = await PropertyType.find();
    if (propertyTypes.length > 0) {
      return {
        success: true,
        data: propertyTypes,
        message: "Property Types retrieved successfully"
      };
    } else {
      return {
        success: false,
        message: "No Property Types found"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getClientProperties() {
  try {

    const properties = await Property.find()
    .populate("authorId", "name avatar.url")
    .populate("category", "title")
    .populate("tags", "title")
    .populate("saleType", "label")
    .populate("type", "label")
    .populate("tradeType", "label")
    .select(" _id title slug summary variants thumbnail bathrooms bedrooms currency createDate ")
    .lean();
      console.log(properties);

   
    if (properties.length > 0) {
      return {
        success: true,
        data: properties,
        message: "املاک با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ ملکی یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getPropertysForDropDownMenu() {
  try {
    const propertys = await Propertys.find({
      isDeleted: false,
      status: "active"
    }).select("id title description");

    if (propertys.length > 0) {
      return {
        success: true,
        data: categories,
        message: "پست ها با موفقیت برای DropDownMenu دریافت شدند"
      };
    } else {
      return {
        success: false,
        message: "هیچ پستی فعال برای DropDownMenu یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getProperty(req) {
  try {
    const property = await Property.findById(req.query.id)
      .populate("authorId", "name avatar.url")
      .populate("category", "title")
      .populate("tags", "title")
      .select(
        "_id propertyId title description slug  createdAt  status isFeatured gallery features publishDate location"
      );
    if (property) {
      return {
        success: true,
        message: "اطلاعات پست با موفقیت دریافت شد",
        data: property
      };
    } else {
      return {
        success: false,
        message: "دریافت اطلاعات پست با شکست مواجه شد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function updateProperty(req) {
  const { id } = req.query;
  try {
    const {
      title,
      description,
      content,
      publishDate,
      tags,
      category,
      featuredImage,
      authorId,
      isDeleted,
      publishStatus
    } = req.body || {};
    console.log("publishStatus", publishStatus);

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (content !== undefined) updateFields.content = content;
    // if (publishDate !== undefined) updateFields.publishDate = publishDate;
    // if (tags !== undefined) updateFields.tags = tags;
    // if (category !== undefined) updateFields.category = category;
    // // if (featuredImage !== undefined) updateFields.featuredImage = featuredImage;
    // if (authorId !== undefined) updateFields.authorId = authorId;
    // if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;
    if (publishStatus !== undefined) updateFields.publishStatus = publishStatus;

    const property = await Property.findByIdAndUpdate(id, updateFields, {
      new: true
    })
      .populate("tags")
      .populate("category")
      .populate("authorId");
    if (property) {
      return {
        success: true,
        message: "پست با موفقیت به‌روزرسانی شد",
        data: property
      };
    } else {
      return {
        success: false,
        message: "پستی پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// delete Property
export async function deleteProperty(req) {
  try {
    const property = await Property.findByIdAndUpdate(
      req.query.id,
      { isDeleted: true },
      { new: true }
    );

    if (property) {
      return {
        success: true,
        message: "پست با موفقیت حذف شد",
        data: property
      };
    } else {
      return {
        success: false,
        message: "پست پیدا نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
