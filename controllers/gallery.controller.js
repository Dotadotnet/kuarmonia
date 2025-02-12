import Gallery from "@/models/gallery.model";
import path from "path";
import removeFile from "@/utils/removeFile";


export async function addGallery(req) {
  try {
    const { category, description } = req.body;
    let featuredImage = null;
let galleries = [];
    if (req.uploadedFiles && req.uploadedFiles["featuredImage"] && req.uploadedFiles["featuredImage"].length > 0) {
      const file = req.uploadedFiles["featuredImage"][0]; 
      const fileExtension = path.extname(file.url).substring(1).toLowerCase();
    
      featuredImage = {
        url: file.url || "N/A",
        public_id: file.key || "ناشناخته",
        type:
          fileExtension === "jpg" ||
          fileExtension === "jpeg" ||
          fileExtension === "png"
            ? "image"
            : fileExtension === "mp4"
            ? "video"
            : "unknown",
      };
    }
    
    if (req.uploadedFiles && req.uploadedFiles["gallery"] && req.uploadedFiles["gallery"].length > 0) {
      galleries = req.uploadedFiles["gallery"].map((file) => {
        const fileExtension = path.extname(file.url).substring(1).toLowerCase();
        return {
          url: file.url,
          public_id: file.key || "ناشناخته",
          type:
            fileExtension === "jpg" ||
            fileExtension === "jpeg" ||
            fileExtension === "png"
              ? "image"
              : fileExtension === "mp4"
              ? "video"
              : "unknown",
        };
      });
    }

      const galleryInstance = await Gallery.create({
        category,
        description,
        featuredImage,
        gallery: galleries
      });
     
    if (galleryInstance) {
      return {
        success: true,
        message: "گالری با موفقیت ایجاد شد"
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت گالری"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getGalleries(req) {
  try {
    const { page = 1, limit = 7, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    const galleries = await Gallery.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "title id")
      .select(
        "_id galleryId gallery featuredImage description  createdAt status "
      );
    
    const total = await Gallery.countDocuments(searchQuery);
    if (galleries.length > 0) {
      return {
        success: true,
        data: galleries,
        total: total,
        message: "گالری با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ گالری یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function updateGallery(req) {
  try {
    const { id } = req.query;

    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const gallery = await Gallery.findByIdAndUpdate(id, updateFields, {
      new: true
    });

    if (gallery) {
      return {
        success: true,
        message: "دسته‌بندی با موفقیت به‌روزرسانی شد",
        data: gallery
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

// delete Gallery
export async function deleteGallery(req) {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.query.id);

    if (gallery) {
      for (const item of gallery.gallery) {
        const filePath = path.join(process.cwd(), "public", item.url);
        await removeFile(filePath);
      }

      const featuredImagePath = path.join(
        process.cwd(),
        "public",
        gallery.featuredImage.url
      );
      await removeFile(featuredImagePath);

      return {
        success: true,
        message: "گالری با موفقیت حذف شد"
      };
    } else {
      return {
        success: false,
        message: "خطا در حذف گالری"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getGallery(req) {
  try {
    const gallery = await Gallery.findById(req.query.id).populate(
      "category",
      "title description"
    );

    if (!gallery) {
      return {
        success: false,
        message: "گالری موردنظر یافت نشد"
      };
    }

    const categoriesInUse = await Gallery.distinct("category").exec();


    return {
      success: true,
      message: "اطلاعات گالری  با موفقیت دریافت شد",
      data: gallery
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
export async function getClientGallery() {
  try {


    const categories = await Gallery.find()
      .select("_id")
      .populate("category", "title id") 
      .exec();


    return {
      success: true,
      message: "اطلاعات گالری‌ها و دسته‌بندی‌ها با موفقیت دریافت شد",
      data:categories
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
