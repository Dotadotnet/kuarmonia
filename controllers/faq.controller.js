import Cart from "@/models/cart.model";
import Favorite from "@/models/favorite.model";
import Purchase from "@/models/purchase.model";
import Faqs from "@/models/faqs.model";
import Review from "@/models/review.model";
import User from "@/models/admin.model";

// add new questions
export async function addFaq(req) {
  try {
    const { question, answer, category, tags } = req.body;

    // برای اطمینان از ذخیره‌سازی درست، از 'await' استفاده کنید.
    await Faqs.create({
      question,
      answer,
      category,
      tags: tags, // مطمئن شوید که tags به درستی به آرایه تبدیل می‌شود
      creator: req.admin._id
    });

    return {
      success: true,
      message: "Faqs created successfully"
    };
  } catch (error) {
    console.error("Error saving FAQ:", error); // نمایش خطا در کنسول برای اشکال‌زدایی
    return {
      success: false,
      message: error.message
    };
  }
}
// get all questionss
export async function getFaqs() {
  try {
    const faqs = await Faqs.find({ isDeleted: false })
      .populate("creator", "name avatar.url")
      .populate("tags","title keywords")
      .populate("category","title")
      .sort({ updatedAt: -1 });

    if (faqs) {
      return {
        success: true,
        message: "Successfully fetch all questionss",
        data: faqs
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch all questionss"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// get questions
export async function getFaq(req) {
  try {
    const questions = await Faqs.findById(req.query.id);

    if (questions) {
      return {
        success: true,
        message: "Successfully fetch questions information",
        data: questions
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch questions information"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// update questions
export async function updateFaqs(req) {
  try {
    const questions = await Faqs.findById(req.query.id);

    const updatedFaqs = req.body;

   
    updatedFaqs.duration = JSON.parse(req.body.duration);

    const result = await Faqs.findByIdAndUpdate(questions._id, {
      $set: updatedFaqs
    });

    if (result) {
      return {
        success: true,
        message: "Successfully updated questions"
      };
    } else {
      return {
        success: false,
        message: "Failed to update questions"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// delete questions
export async function removeFaq(req) {
  try {
    const faq = await Faqs.findOneAndUpdate(
      { _id: req.query.id, isDeleted: false }, 
      { $set: { isDeleted: true } }, 
      { new: true } 
    );
    if (!faq) {
      return {
        success: false,
        message: "FAQ not found or already deleted"
      };
    }
    return {
      success: true,
      message: "Successfully deleted questions"
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// get filtered questionss
export async function getFilteredFaqss(req) {
  try {
    let filter = {};

    if (req.body.dateRange && req.body.dateRange.startDate) {
      filter["duration.startDate"] = {
        $gte: new Date(req.body.dateRange.startDate)
      };
    }

    if (req.body.dateRange && req.body.dateRange.endDate) {
      filter["duration.endDate"] = {
        $lte: new Date(req.body.dateRange.endDate)
      };
    }

    if (req.body.priceRange) {
      filter.price = {
        $gte: req.body.priceRange.min,
        $lte: req.body.priceRange.max
      };
    }

    if (req.body.countries && req.body.countries.length > 0) {
      filter.location = { $in: req.body.countries };
    }

    if (req.body.category && req.body.category.length > 0) {
      filter.type = { $in: req.body.category };
    }

    const questionss = await Faqs.find(filter);

    return {
      success: true,
      message: "املاک و فرصت ها با موفقیت دریافت شدند",
      data: questionss || []
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
