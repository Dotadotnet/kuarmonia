 

import Favorite from "@/models/favorite.model";
import User from "@/models/admin.model";

// add to favorite
export async function addToFavorite(req) {
  try {
    const favorite = await Favorite.findOne({ admin: req.admin._id });
    let result = {};

    if (favorite) {
      result = await Favorite.findOneAndUpdate(
        { admin: req.admin._id },
        {
          $push: { rents: req.body.rent },
        }
      );
    } else {
      result = await Favorite.create({
        admin: req.admin._id,
        rents: [req.body.rent],
      });

      await User.findByIdAndUpdate(req.admin._id, {
        $set: {
          favorite: result._id,
        },
      });
    }

    if (result) {
      return {
        success: true,
        message: "Successfully added to favorite",
      };
    } else {
      return {
        success: false,
        message: "Failed to add to favorite",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get favorite
export async function getFavorites() {
  try {
    const favorite = await Favorite.find().populate([
      "admin",
      {
        path: "rents",
        populate: ["owner"],
      },
    ]);

    if (favorite) {
      return {
        success: true,
        message: "Successfully fetch favorites",
        data: favorite,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch favorites",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// delete from favorite
export async function removeFromFavorite(req) {
  try {
    const admin = await User.findById(req.admin._id);

    const result = await Favorite.findByIdAndUpdate(admin.favorite, {
      $pull: {
        rents: req.query.id,
      },
    });

    if (result) {
      return {
        success: true,
        message: "Successfully deleted from favorite",
      };
    } else {
      return {
        success: false,
        message: "Failed to delete from favorite",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
