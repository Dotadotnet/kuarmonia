// controllers/Media.controller.js
import Media from "@/models/media.model";
import Like from "@/models/like.model";
import User from "@/models/user.model";
export async function addMedia(req) {
  try {
    const {
      title,
      description,
      tags,
      category,
      metaTitle,
      metaDescription,
      isFeatured,
      visibility
    } = req.body;
    let thumbnail = null;
    let media = null;

    if (
      req.uploadedFiles &&
      req.uploadedFiles["thumbnail"] &&
      req.uploadedFiles["thumbnail"].length > 0
    ) {
      const file = req.uploadedFiles["thumbnail"][0];

      thumbnail = {
        url: file.url || "N/A",
        public_id: file.key || "ناشناخته"
      };
    }
    if (
      req.uploadedFiles &&
      req.uploadedFiles["media"] &&
      req.uploadedFiles["media"].length > 0
    ) {
      const file = req.uploadedFiles["media"][0];

      media = {
        url: file.url || "N/A",
        public_id: file.key || "ناشناخته"
      };
    }

    const result = await Media.create({
      title,
      description,
      tags: JSON.parse(tags),
      media,
      thumbnail,
      category,
      authorId:req.user._id,
      metaTitle,
      metaDescription,
      isFeatured,
      visibility
    });

    if (result) {
      const like = await Like.create({
        entityId: result._id,
        entityType: "Media",
        type: "like"
      });

      const dislike = await Like.create({
        entityId: result._id,
        entityType: "Media",
        type: "dislike"
      });

      result.likes = [like._id];
      result.dislikes = [dislike._id];
      await result.save();

      return {
        success: true,
        message: "رسانه با موفقیت ایجاد شد",
        data: result
      };
    } else {
      return {
        success: false,
        message: "خطا در ساخت رسانه"
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getMedias(req) {
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
            { content: { $regex: search, $options: "i" } }
          ],
          isDeleted: false
        }
      : { isDeleted: false };
    if (!isSuperAdmin) {
      searchQuery.authorId = userId;
    }
    const result = await Media.find(searchQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("authorId", "name avatar.url")
      .populate("tags", "title")
      .select(
        "_id mediaId thumbnail media title description category tags createdAt views likes dislikes status likeCount dislikeCount "
      );

    const total = await Media.countDocuments(searchQuery);

    if (result.length > 0) {
      return {
        success: true,
        data: result,
        total,
        message: "رسانه با موفقیت دریافت شد"
      };
    } else {
      return {
        success: false,
        message: "هیچ رسانه ای یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function getClientMedias(req) {
  try {
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
      status: "active"
    };
    const superAdmin = await User.findOne({ role: "superAdmin" });
    const result = await Media.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate("authorId", "name avatar.url")
      .populate("category", "title")
      .select(
        "_id mediaId title description createdAt category views likes dislikes status isFeatured thumbnail visibility slug authorId publishDate"
      );
    const total = await Media.countDocuments({ isDeleted: false });
    if (result.length > 0) {
      return {
        success: true,
        data: result,
        superAdmin: {
          avatar: superAdmin?.avatar?.url,
          name: superAdmin?.name
        },
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

export async function getMediasForDropDownMenu() {
  try {
    const Medias = await Medias.find({
      isDeleted: false,
      status: "active"
    }).select("id title description");

    if (Medias.length > 0) {
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

export async function getMedia(req) {
  try {
    const result = await Media.findById(req.query.id)
      .populate("authorId", "name avatar.url")
      .populate("category", "title")
      .populate("tags", "title")
      .select(
        "_id mediaId title description slug canonicalUrl content createdAt views likes dislikes media thumbnail status isFeatured gallery featuredImage metaTitle metaDescription metaKeywords visibility publishStatus publishDate"
      );
    if (result) {
      return {
        success: true,
        message: "اطلاعات پست با موفقیت دریافت شد",
        data: result
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

export async function updateMedia(req) {
  try {

    const mediaDoc = await Media.findById(req.query.id);
    if (!mediaDoc) {
      return {
        success: false,
        message: "رسانه پیدا نشد"
      };
    }

    const updateFields = { ...req.body }; 
    let thumbnail = null;
    let uploadedMedia = null;

    if (req.uploadedFiles?.thumbnail?.length > 0) {
      const file = req.uploadedFiles.thumbnail[0];
      thumbnail = {
        url: file.url || "N/A",
        public_id: file.key || "ناشناخته"
      };
      updateFields.thumbnail = thumbnail;
    }

    if (req.uploadedFiles?.media?.length > 0) {
      const file = req.uploadedFiles.media[0];
      uploadedMedia = {
        url: file.url || "N/A",
        public_id: file.key || "ناشناخته"
      };
      updateFields.media = uploadedMedia;
    }
    updateFields.tags = JSON.parse(req.body.tags);
    const result = await Media.findByIdAndUpdate(req.query.id, updateFields, {
      new: true
    });

    return {
      success: true,
      message: "رسانه با موفقیت به‌روزرسانی شد",
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// delete Media
export async function deleteMedia(req) {
  try {
    const result = await Media.findByIdAndUpdate(
      req.query.id,
      { isDeleted: true },
      { new: true }
    );

    if (result) {
      return {
        success: true,
        message: "پست با موفقیت حذف شد",
        data: Media
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
