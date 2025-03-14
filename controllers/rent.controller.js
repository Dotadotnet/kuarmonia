
import Cart from "@/models/cart.model";
import Favorite from "@/models/favorite.model";
import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import Review from "@/models/review.model";
import User from "@/models/admin.model";
import removePhoto from "@/utils/remove.util";

// add new rent
export async function addRent(req) {
  try {
    const { duration, ...otherInformation } = req.body;
    let gallery = [];

    gallery = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const rentInformation = {
      ...otherInformation,
      gallery,
      duration: JSON.parse(duration),
      owner: req.admin._id,
    };

    const rent = await Rent.create(rentInformation);

    if (rent) {
      await rent.save();
      await User.findByIdAndUpdate(rent.owner, {
        $push: {
          rents: rent._id,
        },
      });

      return {
        success: true,
        message: "Rent created successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to create rent",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get all rents
export async function getRents() {
  try {
    const rents = await Rent.find()
      .populate(["admins", "owner", "reviews"])
      .sort({ updatedAt: -1 });

    if (rents) {
      return {
        success: true,
        message: "Successfully fetch all rents",
        data: rents,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch all rents",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get rent
export async function getRent(req) {
  try {
    const rent = await Rent.findById(req.query.id).populate([
      "admins",
      {
        path: "owner",
        populate: "rents",
      },
      {
        path: "reviews",
        populate: ["reviewer", "rent"],
      },
    ]);

    if (rent) {
      return {
        success: true,
        message: "Successfully fetch rent information",
        data: rent,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch rent information",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// update rent
export async function updateRent(req) {
  try {
    const rent = await Rent.findById(req.query.id);

    const updatedRent = req.body;

    if (req.files && req.files.length > 0) {
      rent.gallery.forEach(
        async (gallery) => await removePhoto(gallery?.public_id)
      );

      updatedRent.gallery = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    updatedRent.duration = JSON.parse(req.body.duration);

    const result = await Rent.findByIdAndUpdate(rent._id, {
      $set: updatedRent,
    });

    if (result) {
      return {
        success: true,
        message: "Successfully updated rent",
      };
    } else {
      return {
        success: false,
        message: "Failed to update rent",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// delete rent
export async function deleteRent(req) {
  try {
    const rent = await Rent.findByIdAndDelete(req.query.id);

    if (rent) {
      rent.gallery.forEach(
        async (gallery) => await removePhoto(gallery?.public_id)
      );

      // remove from owner's rents
      await User.findByIdAndUpdate(rent.owner, {
        $pull: {
          rents: rent._id,
        },
      });

      // remove from reviews
      if (rent.reviews.length > 0) {
        for (let i = 0; i < rent.reviews.length; i++) {
          const review = await Review.findByIdAndDelete(rent.reviews[i]);

          // remove review from admin's review array
          await User.findByIdAndUpdate(review.admin, {
            $pull: {
              reviews: review._id,
            },
          });
        }
      }

      // remove from all admins cart
      await Cart.updateMany(
        {},
        {
          $pull: {
            rents: rent._id,
          },
        }
      );

      // remove from all admins favorite list
      await Favorite.updateMany(
        {},
        {
          $pull: {
            rents: rent._id,
          },
        }
      );

      // remove from purchase list
      await Purchase.deleteMany({ rent: rent._id });

      // remove from reviews list
      await Review.deleteMany({ rent: rent._id });

      return {
        success: true,
        message: "Successfully deleted rent",
      };
    } else {
      return {
        success: false,
        message: "Failed to delete rent",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get filtered rents
export async function getFilteredRents(req) {
  try {
    let filter = {};

    if (req.body.dateRange && req.body.dateRange.startDate) {
      filter["duration.startDate"] = {
        $gte: new Date(req.body.dateRange.startDate),
      };
    }

    if (req.body.dateRange && req.body.dateRange.endDate) {
      filter["duration.endDate"] = {
        $lte: new Date(req.body.dateRange.endDate),
      };
    }

    if (req.body.priceRange) {
      filter.price = {
        $gte: req.body.priceRange.min,
        $lte: req.body.priceRange.max,
      };
    }

    if (req.body.countries && req.body.countries.length > 0) {
      filter.location = { $in: req.body.countries };
    }

    if (req.body.category && req.body.category.length > 0) {
      filter.type = { $in: req.body.category };
    }

    const rents = await Rent.find(filter);

    return {
      success: true,
      message: "املاک و فرصت ها با موفقیت دریافت شدند",
      data: rents || [],
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
