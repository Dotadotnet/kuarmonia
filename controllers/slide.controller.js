import Slide from "@/models/slide.model";
import path from "path";
export async function addSlide(req) {
  try {
    const { title, description, url, creator, isFeatured } = req.body;
    let bgImg = null;


    if (req.uploadedFiles && req.uploadedFiles["bgImg"] && req.uploadedFiles["bgImg"].length > 0) {
      const file = req.uploadedFiles["bgImg"][0]; 
      const filePath = file.url;
    
      const fileExtension = path.extname(filePath).substring(1).toLowerCase();
    
      bgImg = {
        url: file.url,
        public_id: file.key,
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


  
 
      const slide = await Slide.create({
        title,
        description,
        bgImg,
        url,
        creator,
        isFeatured
      });

    if (slide) {
      return {
        success: true,
        message: "اسلاید با موفقیت ایجاد شد"
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت اسلاید"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getSlides(req) {
  try {
    const { page = 1, limit = 7, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const searchQuery = search
      ? { title: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    const slides = await Slide.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("creator", "name")
      .select(
        "_id slideId creator title bgImg  description  createdAt status "
      );
    const total = await Slide.countDocuments(searchQuery);
    if (slides.length > 0) {
      return {
        success: true,
        data: slides,
        total: total,
        message: "اسلاید با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ اسلاید یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getClientSlides() {
  try {
    const slides = await Slide.find({isDeleted: false}, "_id slideId title bgImg description url");
    if (slides.length > 0) {
      return {
        success: true,
        data: slides,
        message: "اسلاید با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ اسلاید یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function updateSlide(req) {
  try {
    const { id } = req.query;
    console.log(req.body);

    const { title, description, status, isDeleted } = req.body || {};
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (isDeleted !== undefined) updateFields.isDeleted = isDeleted;

    const slide = await Slide.findByIdAndUpdate(id, updateFields, {
      new: true
    });

    if (slide) {
      return {
        success: true,
        message: "دسته‌بندی با موفقیت به‌روزرسانی شد",
        data: slide
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

// delete Slide
export async function deleteSlide(req) {
  try {
    const slide = await Slide.findByIdAndUpdate(
      req.query.id,
      { isDeleted: true },
      { new: true }
    );

    if (slide) {
      return {
        success: true,
        message: "دسته‌بندی با موفقیت حذف شد",
        data: slide
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

export async function getSlide(req) {
  try {
    const slide = await Slide.findById(req.query.id);

    if (!slide) {
      return {
        success: false,
        message: "گالری موردنظر یافت نشد"
      };
    }

    const categoriesInUse = await Slide.distinct("category").exec();

    const categories = await Category.find(
      { _id: { $in: categoriesInUse } },
      "title description"
    );

    return {
      success: true,
      message: "اطلاعات گالری  با موفقیت دریافت شد",
      data: {
        slide,
        categories
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
