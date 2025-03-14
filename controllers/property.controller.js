// controllers/property.controller.js
import Property from "@/models/property.model";
import Admin from "@/models/admin.model";
export async function addProperty(req) {
  try {
    const {
      selectedLocation,
      variants,
      tags,
      features,
      amenities,
      ...otherInformation 
    } = req.body;
    let thumbnail = null;
    let gallery = [];
    console.log(req.uploadedFiles)
    // پردازش تصاویر
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
    
    if (req.uploadedFiles["gallery"]?.length > 0) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key
      }));
    }
    
    // ایجاد ملک
    const property = await Property.create({
      ...otherInformation, // سایر اطلاعات به‌صورت مستقیم اضافه می‌شود
      location: JSON.parse(selectedLocation),
      features: JSON.parse(features),
      tags: JSON.parse(tags),
      variants: JSON.parse(variants),
      amenities: JSON.parse(amenities),
      creator:req.admin._id,
      thumbnail,
      gallery
    });
    

    return {
      success: true,
      message: "ملک با موفقیت ایجاد شد",
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
    const { page = 1, limit = 7, search = "", adminId } = req.query;
    const skip = (page - 1) * limit;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return {
        success: false,
        message: "کاربر پیدا نشد"
      };
    }

    const isSuperAdmin = admin.role === "superAdmin";

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            {}
          ],
          isDeleted: false
        }
      : { isDeleted: false };
    if (!isSuperAdmin) {
      searchQuery.creator = adminId;
    }
    const properties = await Property.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("creator", "name avatar.url")
      .populate("type", "title amenities")
      .populate("tradeType", "title priceFields")
      .populate("saleType", "title ")
      .select(
        "_id propertyId title createdAt amenities views likes dislikes status likeCount dislikeCount thumbnail "
      );
console.log(properties)
    const total = await Property.countDocuments(searchQuery);

    if (properties.length > 0) {
      return {
        success: true,
        data: properties,
        total,
        message: "املاک با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ ملکی یافت نشد"
      };
    }
  } catch (error) {
    console.log("error",error)
    return {
      success: false,
      message: error
    };
  }
}



export async function getClientProperties() {
  try {
    const properties = await Property.find()
      .populate("creator", "name avatar.url")
      .populate("category", "title")
      .populate("tags", "title")
      .populate("saleType", "title")
      .populate("type", "title features")
      .populate("tradeType", "title priceFileds ")
      .select(
        " _id title slug summary variants thumbnail bathrooms bedrooms currency createDate country square state city citizenshipStatus"
      )
      .lean();

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



export async function getProperty(req) {
  try {
    const property = await Property.findById(req.query.id)
      .populate("creator", "name avatar.url")
      .populate("category", "title")
      .populate("tradeType", "title priceFileds")
      .populate("saleType", "title")
      .populate("type", "title features")
   
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
      creator,
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
    // if (creator !== undefined) updateFields.creator = creator;
    // if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;
    if (publishStatus !== undefined) updateFields.publishStatus = publishStatus;

    const property = await Property.findByIdAndUpdate(id, updateFields, {
      new: true
    })
      .populate("tags")
      .populate("category")
      .populate("creator");
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
